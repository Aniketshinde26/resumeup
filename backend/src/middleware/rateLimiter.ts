import rateLimit from 'express-rate-limit';
import { CoverLetter } from '../models';

const config = {
    auth: {
        windowMs: 15 * 60 * 1000, 
        max: 5, 
        message: "Too many authentication attempts. Please try again in 15 minutes."
    },
    oauth: {
        windowMs: 1 * 60 * 1000, 
        max: 5, 
        message: "Too many social login attempts. Please try again in a minute."
    },
    dashboard: {
        windowMs: 5 * 60 * 1000, 
        max: 100, 
        message: "Dashboard requests moving too fast. Please slow down."
    },
    builder: {
        windowMs: 1 * 60 * 1000, 
        max: 10, 
        message: "You are saving documents too quickly. Please wait a moment."
    },
    forgotpassword: {
        windowMs: 15 * 60 * 1000,
        max: 3,
        message: "Too many password reset requests. Please wait 15 minutes."
    },
    logout: {
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: "Too many logout attempts. Please try again later."
    },
    refresh: {
        windowMs: 15 * 60 * 1000,
        max: 40,
        message: "Too many refresh attempts. Please try again later."
    },
    login: {
        windowMs: 1 * 60 * 1000,
        max: 5,
        message: "Too many login attempts. Please try again later."
    },
    resumecreation: {
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: "You are creating resumes too quickly. Please wait a moment."
    },
    deleteResume: {
        windowMs: 1 * 60 * 1000,
        max: 20,
        message: "You are deleting resumes too quickly. Please wait a moment."
    },
    getResumes:{
        windowMs: 1 * 60 * 1000,
        max: 30,
        message: "You are fetching resumes too quickly. Please wait a moment."
    },
    getSingleResume:{
        windowMs: 1 * 60 * 1000,
        max: 30,
        message: "You are fetching resumes too quickly. Please wait a moment."
    },
    CoverLetterCreation: {
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: "You are creating cover letters too quickly. Please wait a moment."
    },
    deleteCoverLetter: {
        windowMs: 1 * 60 * 1000,
        max: 20,
        message: "You are deleting cover letters too quickly. Please wait a moment."    
    },
    getCoverLetters:{
        windowMs: 1 * 60 * 1000,
        max: 30,
        message: "You are fetching cover letters too quickly. Please wait a moment."
    },
    getSingleCoverLetter:{
        windowMs: 1 * 60 * 1000,
        max: 30,
        message: "You are fetching cover letters too quickly. Please wait a moment."
    },
    getDashboard:{
        windowMs: 1 * 60 * 1000,
        max: 2,
        message: "You are fetching dashboard data too quickly. Please wait a moment."
    }


};


const createHandler = (customMessage: string) => {
    return (req: any, res: any) => {
        res.status(429).json({ error: customMessage });
    };
};

// Dynamic key generator: Uses User ID if logged in, falls back to IP address
const getUserOrIpKey = (req: any) => {
    return req.user?.id || req.user?._id ? `user_${req.user.id || req.user._id}` : req.ip;
};

// --- IP-BASED LIMITERS (For Unauthenticated Routes) ---

export const authLimiter = rateLimit({
    ...config.auth,
    handler: createHandler(config.auth.message)
});

export const loginLimiter = rateLimit({
    ...config.login,
    handler: createHandler(config.login.message)
});

export const oauthLimiter = rateLimit({
    ...config.oauth,
    handler: createHandler(config.oauth.message)
});

export const forgotPasswordLimiter = rateLimit({
    ...config.forgotpassword,
    handler: createHandler(config.forgotpassword.message)
});

// --- USER ID-BASED LIMITERS (For Authenticated Routes) ---

export const builderLimiter = rateLimit({
    ...config.builder,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.builder.message)
});

export const dashboardLimiter = rateLimit({
    ...config.dashboard,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.dashboard.message)
});

export const resumeCreationLimiter = rateLimit({
    ...config.resumecreation,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.resumecreation.message)
});

export const deleteResumeLimiter = rateLimit({
    ...config.deleteResume,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.deleteResume.message)
});

export const logoutLimiter = rateLimit({
    ...config.logout,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.logout.message)
});

export const refreshLimiter = rateLimit({
    ...config.refresh,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.refresh.message)
});

export const getResumesLimiter = rateLimit({
    ...config.getResumes,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.getResumes.message)
});

export const getSingleResumeLimiter = rateLimit({
    ...config.getSingleResume,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.getSingleResume.message)
});

export const CoverLetterCreationLimiter = rateLimit({
    ...config.CoverLetterCreation,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.CoverLetterCreation.message)
});

export const deleteCoverLetterLimiter = rateLimit({
    ...config.deleteCoverLetter,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.deleteCoverLetter.message)
});

export const getCoverLettersLimiter = rateLimit({
    ...config.getCoverLetters,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.getCoverLetters.message)
});

export const getSingleCoverLetterLimiter = rateLimit({
    ...config.getSingleCoverLetter,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.getSingleCoverLetter.message)
});

export const coverLetterBuilderLimiter = rateLimit({
    ...config.builder,
    keyGenerator: getUserOrIpKey,
    handler: createHandler(config.builder.message)
});


