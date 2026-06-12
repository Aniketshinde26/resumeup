import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";
import axios from "axios";
import { UserAttributes } from "../types/UserTypes";
import { RegisterUserResponse, LoginUserResponse, AuthMessageResponse, RefreshTokenResponse } from "../types/ResponseTypes";
import { Op } from "sequelize"; // Imported cleanly for resetPassword

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
};

const generateAccessToken = (user: UserAttributes) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "10m" }
  );
};

const generateRefreshToken = (user: UserAttributes) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// --- REGISTER USER ---
export const registerUser = async (req: Request, res: Response<RegisterUserResponse>): Promise<Response> => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (existingUser.googleId && (!existingUser.password || existingUser.password === "")) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await existingUser.update({ password: hashedPassword, fullname });
        
        return res.status(200).json({
          success: true,
          message: "Password added to your Google account!",
          user: { id: existingUser.id, email: existingUser.email, fullname: existingUser.fullname },
        });
      }
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ 
      success: true, 
      message: "User registered", 
      user: { id: newUser.id, email: newUser.email, fullname: newUser.fullname } 
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ success: false, message: "Error registering user" });
  }
};

// --- LOGIN USER ---
export const loginUser = async (req: Request, res: Response<LoginUserResponse>) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email & password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (!user.password || user.password === "") {
      return res.status(400).json({
        success: false,
        message: "This account was created via Google Login. Please use the 'Sign in with Google' button.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save the refresh token to the database
    await user.update({ refreshToken });

    // 1. Send the REFRESH TOKEN in a secure, httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days matching token expiration
    });

    // 2. Return ONLY the accessToken and user data in the JSON body
    return res.json({
      success: true,
      message: "Login successful",
      accessToken, // Frontend reads this and keeps it in memory (React State/Zustand)
      user: { 
        id: user.id, 
        email: user.email, 
        fullname: user.fullname,

      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: "Error logging in" });
  }
};

// --- GOOGLE LOGIN ---
export const googleLogin = async (req: Request, res: Response<LoginUserResponse>): Promise<Response> => {
  const { id_token } = req.body;

  if (!id_token) {
    return res.status(400).json({ success: false, message: "Missing Google ID Token" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      return res.status(401).json({ success: false, message: "Invalid Google Token Payload" });
    }

    const { sub: googleId, email, name: fullname, picture } = payload;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        fullname: fullname || "Google User",
        email,
        googleId,
        password: "",
      } as UserAttributes);
      console.log(`New user registered via Google: ${email}`);
    } else if (!user.googleId) {
      await user.update({ googleId });
      console.log(`Existing user linked with Google ID: ${email}`);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save the refresh token to the database
    await user.update({ refreshToken });

    // 1. Send the REFRESH TOKEN in your secure, httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions, // Keeps your custom options (like domain, etc.)
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 2. Return ONLY the accessToken and user payload in the JSON body
    return res.status(200).json({
      success: true,
      message: "Google login successful",
      accessToken, // Safe for frontend memory
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        picture: picture || undefined, // Kept safe and clean
      },
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(401).json({ success: false, message: "Failed to authenticate with Google", error: errorMessage });
  }
};

// --- REFRESH ACCESS TOKEN ---
export const refreshAccessToken = async (req: Request, res: Response<RefreshTokenResponse>) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: number; email: string };

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie("token", newAccessToken, cookieOptions);

    return res.json({
      success: true,
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({ success: false, message: "Refresh token expired or invalid" });
  }
};

// --- LOGOUT USER ---
export const logoutUser = async (req: Request, res: Response<AuthMessageResponse>) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ where: { refreshToken } });
      if (user) {
        await user.update({ refreshToken: null });
      }
    }
  } catch (error) {
    console.error("LOGOUT DATABASE ERROR:", error);
  } finally {
    res.clearCookie("token", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    return res.json({ success: true, message: "Logged out successfully" });
  }
};

// --- GITHUB LOGIN ---
export const githubLogin = async (req: Request, res: Response<LoginUserResponse>): Promise<Response> => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ success: false, message: "Missing GitHub Code" });

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const githubAccessToken = tokenResponse.data.access_token; // Renamed slightly to avoid confusion with your app's token
    if (!githubAccessToken) throw new Error("GitHub token exchange failed");

    const [userRes, emailRes] = await Promise.all([
      axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${githubAccessToken}`, "User-Agent": "ResumeUp" }
      }),
      axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${githubAccessToken}`, "User-Agent": "ResumeUp" }
      })
    ]);

    const { id: githubId, name, avatar_url: picture } = userRes.data;
    const primaryEmail = emailRes.data.find((e: any) => e.primary)?.email || emailRes.data[0].email;

    let user = await User.findOne({ where: { email: primaryEmail } });

    if (!user) {
      user = await User.create({
        email: primaryEmail,
        fullname: name || "GitHub User",
        githubId: String(githubId),
        password: "", 
      } as UserAttributes);
    } else if (!user.githubId) {
      await user.update({ githubId: String(githubId) });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Save the refresh token to your database
    await user.update({ refreshToken: newRefreshToken });

    // 1. Send the long-lived REFRESH TOKEN in your secure, httpOnly cookie
    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 2. Return ONLY the accessToken and user payload in the JSON body
    return res.status(200).json({
      success: true,
      message: "GitHub login successful",
      accessToken: newAccessToken, // Perfectly safe for frontend state
      user: { 
        id: user.id, 
        email: user.email, 
        fullname: user.fullname, 
        picture 
      },
    });

  } catch (error: any) {
    console.error("GitHub Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Authentication failed", error: error.message });
  }
};

// --- FORGOT PASSWORD ---
export const forgotPassword = async (req: Request, res: Response<AuthMessageResponse>): Promise<Response> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ success: true, message: "If an account exists with that email, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    await user.update({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 3600000),
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request - ResumeUp",
      message: resetUrl,
    });

    return res.status(200).json({ success: true, message: "Reset link sent to your email!" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to process forgot password request" });
  }
};

// --- RESET PASSWORD ---
export const resetPassword = async (req: Request, res: Response<AuthMessageResponse>): Promise<Response> => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Token is invalid or has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return res.status(200).json({ success: true, message: "Password updated successfully! You can now log in." });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to reset password" });
  }
};