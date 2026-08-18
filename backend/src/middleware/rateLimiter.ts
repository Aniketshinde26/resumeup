import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const config = {
  auth: {
    windowMs: 15 * 60 * 1000,
    max: 10,
    message:
      "Too many authentication attempts. Please try again in 15 minutes.",
  },
  login: {
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  oauth: {
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: "Too many social login attempts. Please try again in 15 minutes.",
  },
  forgotpassword: {
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    message: "Too many forgot password requests. Please try again in 24 hours.",
  },
  resetPassword: {
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    message: "Too many password reset attempts. Please try again in 24 hours.",
  },
  refresh: {
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: "Session refresh limit exceeded. Please try again in 15 minutes.",
  },
  logout: {
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many logout attempts. Please try again in 1 minute.",
  },
  dashboard: {
    windowMs: 1 * 60 * 1000,
    max: 60,
    message:
      "Dashboard requests moving too fast. Please try again in 1 minute.",
  },
  builder: {
    windowMs: 1 * 60 * 1000,
    max: 30,
    message:
      "You are saving documents too quickly. Please wait 1 minute before trying again.",
  },
  resumecreation: {
    windowMs: 1 * 60 * 1000,
    max: 10,
    message:
      "You are creating resumes too quickly. Please try again in 1 minute.",
  },
  deleteResume: {
    windowMs: 1 * 60 * 1000,
    max: 15,
    message:
      "You are deleting resumes too quickly. Please try again in 1 minute.",
  },
  getResumes: {
    windowMs: 1 * 60 * 1000,
    max: 60,
    message:
      "You are fetching resumes too quickly. Please try again in 1 minute.",
  },
  getSingleResume: {
    windowMs: 1 * 60 * 1000,
    max: 60,
    message:
      "You are fetching resumes too quickly. Please try again in 1 minute.",
  },
  CoverLetterCreation: {
    windowMs: 1 * 60 * 1000,
    max: 10,
    message:
      "You are creating cover letters too quickly. Please try again in 1 minute.",
  },
  deleteCoverLetter: {
    windowMs: 1 * 60 * 1000,
    max: 15,
    message:
      "You are deleting cover letters too quickly. Please try again in 1 minute.",
  },
  getCoverLetters: {
    windowMs: 1 * 60 * 1000,
    max: 60,
    message:
      "You are fetching cover letters too quickly. Please try again in 1 minute.",
  },
  getSingleCoverLetter: {
    windowMs: 1 * 60 * 1000,
    max: 60,
    message:
      "You are fetching cover letters too quickly. Please try again in 1 minute.",
  },
};

const createHandler = (customMessage: string) => {
  return (_req: any, res: any) => {
    res.status(429).json({
      success: false,
      message: customMessage,
    });
  };
};

const getUserOrIpKey = (req: any) => {
  const userId = req.user?.id || req.user?._id;
  if (userId) {
    return `user_${userId}`;
  }
  return ipKeyGenerator(req.ip || "");
};

export const authLimiter = rateLimit({
  ...config.auth,
  handler: createHandler(config.auth.message),
});
export const loginLimiter = rateLimit({
  ...config.login,
  handler: createHandler(config.login.message),
});
export const oauthLimiter = rateLimit({
  ...config.oauth,
  handler: createHandler(config.oauth.message),
});
export const forgotPasswordLimiter = rateLimit({
  windowMs: config.forgotpassword.windowMs,
  max: config.forgotpassword.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: createHandler(config.forgotpassword.message),
});
export const resetPasswordLimiter = rateLimit({
  ...config.resetPassword,
  handler: createHandler(config.resetPassword.message),
});

export const builderLimiter = rateLimit({
  ...config.builder,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.builder.message),
});
export const dashboardLimiter = rateLimit({
  ...config.dashboard,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.dashboard.message),
});
export const resumeCreationLimiter = rateLimit({
  ...config.resumecreation,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.resumecreation.message),
});
export const deleteResumeLimiter = rateLimit({
  ...config.deleteResume,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.deleteResume.message),
});
export const logoutLimiter = rateLimit({
  ...config.logout,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.logout.message),
});
export const refreshLimiter = rateLimit({
  ...config.refresh,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.refresh.message),
});
export const getResumesLimiter = rateLimit({
  ...config.getResumes,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.getResumes.message),
});
export const getSingleResumeLimiter = rateLimit({
  ...config.getSingleResume,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.getSingleResume.message),
});
export const CoverLetterCreationLimiter = rateLimit({
  ...config.CoverLetterCreation,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.CoverLetterCreation.message),
});
export const deleteCoverLetterLimiter = rateLimit({
  ...config.deleteCoverLetter,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.deleteCoverLetter.message),
});
export const getCoverLettersLimiter = rateLimit({
  ...config.getCoverLetters,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.getCoverLetters.message),
});
export const getSingleCoverLetterLimiter = rateLimit({
  ...config.getSingleCoverLetter,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.getSingleCoverLetter.message),
});
export const coverLetterBuilderLimiter = rateLimit({
  ...config.builder,
  keyGenerator: getUserOrIpKey,
  handler: createHandler(config.builder.message),
});
