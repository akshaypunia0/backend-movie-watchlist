import { rateLimit } from "express-rate-limit"

const apiRateLimit = rateLimit({
    windowMs: 1000 * 60 * 10,
    max: 30,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
    keyGenerator: (req) => req?.user?.id || req?.ip,
    standardHeaders: true,
    legacyHeaders: false
})

export { apiRateLimit }