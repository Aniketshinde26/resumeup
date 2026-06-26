import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 🛰️ DEFENSIVE GUARD: Look for BOTH lowercase 'authorization' and capitalized 'Authorization'
  const authHeader = req.headers.authorization || req.headers['Authorization'];
  
  // If it's an array (rare case), handle it, otherwise split the string payload
  const token = Array.isArray(authHeader) 
    ? authHeader[0]?.split(" ")[1] 
    : authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("❌ [Backend Auth]: Rejection! No token found in incoming headers:", req.headers);
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err: any) {
    console.log(`❌ [Backend Auth]: JWT verification failed: ${err.message}`);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};



// backend/middleware/authmiddleware.ts

export const optionalToken = (req: Request, res: Response, next: NextFunction) => {
  // 🛰️ Upgrade: Look for the token in the Authorization Header FIRST, then fall back to cookies!
  const authHeader = req.headers.authorization || req.headers['Authorization'];
  
  let token = Array.isArray(authHeader) 
    ? authHeader[0]?.split(" ")[1] 
    : authHeader && authHeader.split(" ")[1];

  // If it's not found in the headers, check the cookie pool
  if (!token) {
    token = req.cookies.token || req.cookies.refreshToken; // checking refresh token or regular token if applicable
  }

  // If there is absolutely no token anywhere, they are a clean guest. Pass them through!
  if (!token) {
    return next(); 
  }

  try {
    // Determine which secret to verify against if you checked the refresh token fallback
    const isRefreshFallback = req.cookies.refreshToken && !authHeader && !req.cookies.token;
    const secret = isRefreshFallback 
      ? (process.env.JWT_REFRESH_SECRET as string) 
      : (process.env.JWT_SECRET as string);

    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    // Bind the clean user details so your resume controller knows exactly who this is!
    req.user = decoded;
    return next();
  } catch (err: any) {  
    // If it's a real logged-in token that just expired, tell the frontend interceptor to refresh it
    if (err.name === "TokenExpiredError") {
      console.log("❌ [Optional Token]: Token expired. Signalling frontend interceptor.");
      return res.status(401).json({ message: "Token expired" });
    }
    
    // If it's just a malformed guest cookie, don't crash—let them act as a guest
    return next(); 
  }
};