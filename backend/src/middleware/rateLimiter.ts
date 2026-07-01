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
        max: 30, 
        message: "You are saving documents too quickly. Please wait a moment."
    }
};

const createHandler = (customMessage: string) => {
    return (req: any, res: any) => {
        res.status(429).json({ error: customMessage });
    };
};

// Fixed syntax below (removed trailing '{' from the skip lines)
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