import process from 'node:process';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 30; // 30 дней

const getAccessTokenSecret = () => {
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }

    return secret;
};

export const getPublicUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        description: user.description,
        avatarSrc: user.avatarSrc,
    };
};

const createAccessToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            username: user.username,
        },
        getAccessTokenSecret(),
        {
            subject: String(user.id),
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
    );
};

const createRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

export const hashRefreshToken = (refreshToken) => {
    return crypto.createHash('sha256').update(refreshToken).digest('hex');
};

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
    });
};

export const clearRefreshTokenCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
};

export const createAuthResponse = async ({ user, res, prisma }) => {
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken();
    const refreshTokenHash = hashRefreshToken(refreshToken);

    await prisma.refreshSession.create({
        data: {
            userId: user.id,
            refreshTokenHash,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN_MS),
        },
    });

    setRefreshTokenCookie(res, refreshToken);

    return {
        user: getPublicUser(user),
        accessToken,
    };
};

export const authenticateAccessToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Access token is required',
        });
    }

    const accessToken = authorizationHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(accessToken, getAccessTokenSecret());

        req.userId = payload.sub;

        return next();
    } catch {
        return res.status(401).json({
            message: 'Invalid or expired access token',
        });
    }
};
