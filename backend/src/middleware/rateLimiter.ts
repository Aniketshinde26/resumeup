import rateLimit from 'express-rate-limit';

const config = {
    
    auth: {
        windowMs: 15 * 60 * 1000, 
        max: 5, 
        message: "Too many authentication attempts. Please try again in 15 minutes."
    },
    oauth: {
        windowMs: 1 * 60 * 1000, 
        max: 2, 
        message: "Too many social login attempts. Please try again in 15 minutes."
    },
    dashboard: {
        windowMs: 5 * 60 * 1000, 
        max: 100, 
        message: "Dashboard requests moving too fast. Please slow down."
    },
    builder: {
        windowMs: 1 * 60 * 1000, 
        max: 5, 
        message: "You are saving documents too quickly. Please wait a moment."
    },
    forgotpassword: {
        windowMs: 1 * 60  * 1000,
        max: 5,
        message: "You have already sent request"
    },
    logout:{
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: "Too many logout attempts. Please try again later."
    },
    refresh:{
        windowMs: 15 * 60 * 1000,
        max: 40,
        message: "Too many refresh attempts. Please try again later."
    },
    login:{
        windowMs: 1 * 60 * 1000,
        max: 2,
        message: "Too many login attempts. Please try again later."
    },
    resumecreation:{
        windowMs: 1 * 60 * 1000,
        max: 10,
        message: "You are creating resumes too quickly. Please wait a moment."
    },
    deleteResume:{
        windowMs: 1 * 60 * 1000,
        max: 20,
        message: "You are deleting resumes too quickly. Please wait a moment."
    }

};

const createHandler = (customMessage: string) => {
    return (req: any, res: any) => {
        res.status(429).json({ error: customMessage });
    };
};

export const authLimiter = rateLimit({
    ...config.auth,
    handler: createHandler(config.auth.message)
});

export const oauthLimiter = rateLimit({
    ...config.oauth,
    handler: createHandler(config.oauth.message)
});

export const dashboardLimiter = rateLimit({
    ...config.dashboard,
    handler: createHandler(config.dashboard.message)
});

export const builderLimiter = rateLimit({
    ...config.builder,
    handler: createHandler(config.builder.message)
});

export const forgotPasswordLimiter = rateLimit({
    ...config.forgotpassword,
    handler: createHandler(config.forgotpassword.message)
});

export const logoutLimiter = rateLimit({
    ...config.logout,
    handler: createHandler(config.logout.message)
});

export const refreshLimiter = rateLimit({
    ...config.refresh,
    handler: createHandler(config.refresh.
        message)
});

export const loginLimiter = rateLimit({
    ...config.login,
    handler: createHandler(config.login.message)
});

export const resumeCreationLimiter = rateLimit({
    ...config.resumecreation,
    handler: createHandler(config.resumecreation.message)
});

export const deleteResumeLimiter = rateLimit({
    ...config.deleteResume,
    handler: createHandler(config.deleteResume.message)
});