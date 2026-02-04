import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
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

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (
        existingUser.googleId &&
        (!existingUser.password || existingUser.password === "")
      ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await existingUser.update({ password: hashedPassword, fullname });
        return res.status(200).json({
          message: "Password added to your Google account!",
          user: existingUser,
        });
      }
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

    if (!user.password || user.password === "") {
      return res.status(400).json({
        message:
          "This account was created via Google Login. Please use the 'Sign in with Google' button.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });

    // Save both cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, fullname: user.fullname },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { id_token } = req.body;

  if (!id_token) {
    return res.status(400).json({ message: "Missing Google ID Token" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      return res.status(401).json({ message: "Invalid Google Token Payload" });
    }

    const { sub: googleId, email, name: fullname, picture } = payload;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        fullname: fullname || "Google User",
        email,
        googleId,
        password: "",
      } as any);
      console.log(`New user registered via Google: ${email}`);
    } else if (!user.googleId) {
      await user.update({ googleId });
      
      (`Existing user linked with Google ID: ${email}`);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });

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

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as { id: number; email: string };

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

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



export const githubLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: "Missing GitHub Code" });

  try {
    // 1. Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) throw new Error("GitHub token exchange failed");

    // 2. Fetch User Data (Parallel calls save time!)
    const [userRes, emailRes] = await Promise.all([
      axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}`, "User-Agent": "ResumeUp" }
      }),
      axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}`, "User-Agent": "ResumeUp" }
      })
    ]);

    const { id: githubId, name, avatar_url: picture } = userRes.data;
    const primaryEmail = emailRes.data.find((e: any) => e.primary)?.email || emailRes.data[0].email;

  // 3. Database Operations (Explicit version)
let user = await User.findOne({ where: { email: primaryEmail } });

if (!user) {
  // CREATE new user
  user = await User.create({
    email: primaryEmail,
    fullname: name || "GitHub User",
    githubId: String(githubId),
    password: "", 
  } as any);
} else if (!user.githubId) {
  // UPDATE existing user found by email
  await user.update({ githubId: String(githubId) });
}

    // 4. Token Generation & Cookies
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await user.update({ refreshToken: newRefreshToken });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };

    res.cookie("token", newAccessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    return res.json({
      message: "GitHub login successful",
      user: { id: user.id, email: user.email, fullname: user.fullname, picture },
    });

  } catch (error: any) {
    console.error("GitHub Auth Error:", error.message);
    res.status(401).json({ message: "Authentication failed" });
  }
};