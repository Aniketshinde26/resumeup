import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";
import axios from "axios";
import { UserAttributes } from "../types/UserTypes";
import {
  RegisterUserResponse,
  LoginUserResponse,
  AuthMessageResponse,
  RefreshTokenResponse,
  GoogleUserInfoResponse,
} from "../types/ResponseTypes";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  AppError,
} from "../utils/AppError";
import { Op } from "sequelize";
import { GoogleLoginRequest } from "../types/GoogleAuthTypes";

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
  path: "/",
  partitioned: isProduction,
};

const generateAccessToken = (user: UserAttributes) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" },
  );
};

const generateRefreshToken = (user: UserAttributes) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" },
  );
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const registerUser = async (
  req: Request,
  res: Response<RegisterUserResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fullname, email, password } = req.body || {};
    if (!fullname || !email || !password) {
      throw new BadRequestError("Fullname, email, and password are required");
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      if (
        existingUser.googleId &&
        (!existingUser.password || existingUser.password === "")
      ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await existingUser.update({ password: hashedPassword, fullname });

        res.status(200).json({
          success: true,
          message: "Password added to your Google account!",
          user: {
            id: existingUser.id,
            email: existingUser.email,
            fullname: existingUser.fullname,
          },
        });
        return;
      }
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      user: {
        id: newUser.id,
        email: newUser.email,
        fullname: newUser.fullname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response<LoginUserResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw new BadRequestError("Email & password required");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    if (!user.password || user.password === "") {
      throw new BadRequestError(
        "This account was created via Google Login. Please use the 'Sign in with Google' button.",
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new BadRequestError("Invalid email or password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (
  req: GoogleLoginRequest,
  res: Response<LoginUserResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id_token, google_access_token } = req.body || {};

    let googleId: string | undefined;
    let email: string | undefined;
    let fullname: string | undefined;

    if (id_token) {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email || !payload.sub) {
        throw new UnauthorizedError("Invalid Google Token Payload");
      }

      googleId = payload.sub;
      email = payload.email;
      fullname = payload.name;
    } else if (google_access_token) {
      const googleUserRes = await axios.get<GoogleUserInfoResponse>(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${google_access_token}` },
        },
      );

      googleId = googleUserRes.data.sub;
      email = googleUserRes.data.email;
      fullname = googleUserRes.data.name;
    } else {
      throw new BadRequestError("Missing Google Token");
    }

    if (!email) {
      throw new UnauthorizedError("Unable to retrieve email from Google");
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        fullname: fullname || "Google User",
        email,
        googleId,
        password: "",
      } as UserAttributes);
    } else if (!user.googleId && googleId) {
      await user.update({ googleId });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Google login successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response<RefreshTokenResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError("No refresh token provided");
    }

    let decoded: { id: number; email: string };
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      ) as { id: number; email: string };
    } catch {
      throw new ForbiddenError("Refresh token expired or invalid");
    }

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ForbiddenError("Invalid refresh token");
    }

    const plainUserData = user.get({ plain: true }) as UserAttributes;
    const newAccessToken = generateAccessToken(plainUserData);

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      accessToken: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response<AuthMessageResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ where: { refreshToken } });
      if (user) {
        await user.update({ refreshToken: null });
      }
    }

    res.clearCookie("refreshToken", cookieOptions);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.clearCookie("refreshToken", cookieOptions);
    next(error);
  }
};

export const githubLogin = async (
  req: Request,
  res: Response<LoginUserResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { code } = req.body || {};

    if (!code) {
      throw new BadRequestError("Missing GitHub Code");
    }

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } },
    );

    const githubAccessToken = tokenResponse.data.access_token;
    if (!githubAccessToken) {
      throw new UnauthorizedError("GitHub token exchange failed");
    }

    const [userRes, emailRes] = await Promise.all([
      axios.get<{ id: number; name: string | null; avatar_url: string }>(
        "https://api.github.com/user",
        {
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            "User-Agent": "ResumeUp",
          },
        },
      ),
      axios.get<GitHubEmail[]>("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
          "User-Agent": "ResumeUp",
        },
      }),
    ]);

    const { id: githubId, name, avatar_url: picture } = userRes.data;
    const primaryEmail =
      emailRes.data.find((e) => e.primary)?.email || emailRes.data[0]?.email;

    if (!primaryEmail) {
      throw new BadRequestError("No verified email found from GitHub account");
    }

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

    await user.update({ refreshToken: newRefreshToken });

    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "GitHub login successful",
      accessToken: newAccessToken,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        picture,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body || {};
    if (!email) {
      throw new BadRequestError("Email is required");
    }

    const sanitizedEmail = email.toLowerCase().trim();
    const currentTime = Date.now();
    const isDev = process.env.NODE_ENV === "development";

    const user = await User.findOne({ where: { email: sanitizedEmail } });

    if (!user) {
      res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
      return;
    }

    const coolDownPeriodInMs = isDev ? 0 : 2 * 60 * 1000;

    if (coolDownPeriodInMs > 0 && user.resetPasswordRequestedAt) {
      const lastRequestTime = new Date(user.resetPasswordRequestedAt).getTime();
      const timeSinceLastRequest = currentTime - lastRequestTime;

      if (timeSinceLastRequest < coolDownPeriodInMs) {
        throw new AppError(
          "Please wait 2 minutes before requesting another reset email.",
          429,
        );
      }
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);

    await user.update({
      resetPasswordToken: hashedToken,
      resetPasswordExpires,
      resetPasswordRequestedAt: new Date(),
    });

    const frontendUrl = process.env.FRONTEND_URL as string;
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "ResumeUp - Password Reset Link",
      message: resetUrl,
    });

    res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response<AuthMessageResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.params;
    const { password } = req.body || {};

    if (!password || typeof password !== "string" || password.trim() === "") {
      throw new BadRequestError("New password is required");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestError("Token is invalid or has expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      refreshToken: null,
      passwordChangedAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully! You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};
