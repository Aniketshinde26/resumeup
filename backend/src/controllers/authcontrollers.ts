import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library"; // <-- NEW IMPORT

// Helper to generate tokens
const generateAccessToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "30m" }
  );
};

const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    await user.update({ refreshToken });

    // Save both cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { id_token } = req.body;

  if (!id_token) {
    return res.status(400).json({ message: "Missing Google ID Token" });
  }

  try {
    // 1. VERIFY THE GOOGLE ID TOKEN (CRITICAL SECURITY STEP)
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      return res.status(401).json({ message: "Invalid Google Token Payload" });
    }

    const { sub: googleId, email, name: fullname, picture } = payload;

    // 2. USER PROVISIONING & DATABASE CHECK
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // New user registration (Sign-Up)
      user = await User.create({
        fullname: fullname || "Google User", // Use name from Google, or a default
        email,
        googleId,
        password: "", // Null/empty password since they use Google
      } as any); // Use 'as any' since password is now optional in UserCreationAttributes
      console.log(`New user registered via Google: ${email}`);
    } else if (!user.googleId) {
      // Existing user, but first time logging in with Google (Account Linking)
      await user.update({ googleId });
      console.log(`Existing user linked with Google ID: ${email}`);
    }

    // 3. ISSUE YOUR OWN JWTs (PLUG INTO YOUR EXISTING FLOW)
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    await user.update({ refreshToken });

    // 4. SAVE COOKIES & SEND RESPONSE (Using your existing logic from loginUser)
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
    });

    return res.json({
      message: "Google login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        picture,
      },
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
    res
      .status(401)
      .json({ message: "Failed to authenticate with Google", error });
  }
};

// ⚡ NEW: REFRESH TOKEN ENDPOINT
export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Validate refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: number; email: string };

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Create new access token
    const newAccessToken = generateAccessToken(user);

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Refresh token expired or invalid" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const user = await User.findOne({ where: { refreshToken } });
    if (user) {
      await user.update({ refreshToken: null });
    }
  }

  res.clearCookie("token");
  res.clearCookie("refreshToken");

  res.json({ message: "Logged out successfully" });
};
