// src/middlewares/optionalAuth.js

import jwt from 'jsonwebtoken';

export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next();
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user = {
            id: payload.userId,
        };
    } catch {
        req.user = null;
    }

    next();
};