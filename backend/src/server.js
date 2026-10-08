import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import path from 'node:path';
import { swaggerSpec } from './config/swagger.js';
import { uploadAvatar } from './middlewares/avatarUpload.js';
import { deleteAvatar, saveAvatar } from './helpers/avatarStorage.js';
import {
    authenticateAccessToken,
    clearRefreshTokenCookie,
    createAuthResponse,
    getPublicUser,
    hashRefreshToken,
} from './helpers/auth.js';

const prisma = new PrismaClient();
const app = express();

const optionalAuthenticateAccessToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
        req.userId = null;
        return next();
    }

    const accessToken = authorizationHeader.replace('Bearer ', '');

    try {
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        req.userId = payload.sub;

        return next();
    } catch {
        req.userId = null;
        return next();
    }
};

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);

app.use('/uploads', express.static(path.resolve(process.cwd(), 'public', 'uploads')));

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const getPaginationParams = (req, defaultLimit = 3) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || defaultLimit);

    const normalizedPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

    const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : defaultLimit;

    const skip = (normalizedPage - 1) * normalizedLimit;

    return {
        page: normalizedPage,
        limit: normalizedLimit,
        skip,
    };
};
const getPagesCount = (total, limit) => {
    return Math.max(1, Math.ceil(total / limit));
};

const mapPostToPreview = (post, isSaved = false, isLiked = false) => {
    return {
        id: post.id,
        type: post.type,
        title: post.title,
        description: post.description,
        categoryId: post.categoryId,
        date: post.date,
        readingTime: post.readingTime,
        isSaved,
        isLiked,

        author: {
            name: post.author.name,
            avatar: {
                src: post.author.avatarSrc,
                alt: post.author.avatarAlt,
                width: post.author.avatarWidth,
                height: post.author.avatarHeight,
            },
        },

        stats: {
            likes: post.stats?.likes ?? 0,
            views: post.stats?.views ?? 0,
            comments: post.stats?.comments ?? 0,
            shares: post.stats?.shares ?? 0,
        },
    };
};

const mapPostToDetails = (post) => {
    return {
        id: post.id,
        type: post.type,
        title: post.title,
        description: post.description,
        categoryId: post.categoryId,
        date: post.date,
        readingTime: post.readingTime,

        author: {
            name: post.author.name,
            avatar: {
                src: post.author.avatarSrc ?? '/images/authors/default-avatar.png',
                alt: post.author.avatarAlt ?? `${post.author.name} avatar`,
                width: post.author.avatarWidth ?? 80,
                height: post.author.avatarHeight ?? 80,
            },
        },

        stats: {
            likes: post.stats?.likes ?? 0,
            views: post.stats?.views ?? 0,
            comments: post.stats?.comments ?? 0,
            shares: post.stats?.shares ?? 0,
        },

        bannerImage: {
            src: post.bannerImageSrc,
            alt: post.bannerImageAlt,
            width: post.bannerImageWidth,
            height: post.bannerImageHeight,
        },

        content: {
            introduction: post.contentIntroduction,
            sections: post.sections.map((section) => ({
                title: section.title,
                paragraphs: section.paragraphs,
            })),
        },
    };
};

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get posts
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         example: all
 *       - in: query
 *         name: savedOnly
 *         schema:
 *           type: boolean
 *         example: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 3
 *     responses:
 *       200:
 *         description: Paginated posts list
 *       401:
 *         description: Unauthorized for savedOnly=true
 *       500:
 *         description: Failed to fetch posts
 */
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get posts
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         example: all
 *       - in: query
 *         name: savedOnly
 *         schema:
 *           type: boolean
 *         example: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 3
 *     responses:
 *       200:
 *         description: Paginated posts list
 *       401:
 *         description: Unauthorized for savedOnly=true
 *       500:
 *         description: Failed to fetch posts
 */
app.get('/posts', optionalAuthenticateAccessToken, async (req, res) => {
    try {
        const categoryId = req.query.categoryId || 'all';
        const savedOnly = req.query.savedOnly === 'true';

        const { page, limit, skip } = getPaginationParams(req);

        const postWhere =
            categoryId === 'all'
                ? {}
                : {
                      categoryId,
                  };

        if (savedOnly) {
            if (!req.userId) {
                return res.status(401).json({
                    message: 'Access token is required',
                });
            }

            const savedPostWhere = {
                userId: req.userId,
                post: postWhere,
            };

            const [total, savedPosts] = await prisma.$transaction([
                prisma.savedPost.count({
                    where: savedPostWhere,
                }),

                prisma.savedPost.findMany({
                    where: savedPostWhere,
                    skip,
                    take: limit,
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        post: {
                            include: {
                                author: true,
                                stats: true,
                            },
                        },
                    },
                }),
            ]);

            const postIds = savedPosts.map((savedPost) => savedPost.post.id);

            let likedPostIds = [];

            if (postIds.length > 0) {
                const likedPosts = await prisma.postLike.findMany({
                    where: {
                        userId: req.userId,
                        postId: {
                            in: postIds,
                        },
                    },
                    select: {
                        postId: true,
                    },
                });

                likedPostIds = likedPosts.map((likedPost) => likedPost.postId);
            }

            const likedPostIdsSet = new Set(likedPostIds);
            const pages = getPagesCount(total, limit);

            return res.status(200).json({
                data: savedPosts.map((savedPost) =>
                    mapPostToPreview(savedPost.post, true, likedPostIdsSet.has(savedPost.post.id)),
                ),
                page,
                limit,
                total,
                pages,
            });
        }

        const [total, posts] = await prisma.$transaction([
            prisma.post.count({
                where: postWhere,
            }),

            prisma.post.findMany({
                where: postWhere,
                skip,
                take: limit,
                include: {
                    author: true,
                    stats: true,
                },
                orderBy: {
                    date: 'desc',
                },
            }),
        ]);

        const postIds = posts.map((post) => post.id);

        let savedPostIds = [];
        let likedPostIds = [];

        if (req.userId && postIds.length > 0) {
            const [savedPosts, likedPosts] = await Promise.all([
                prisma.savedPost.findMany({
                    where: {
                        userId: req.userId,
                        postId: {
                            in: postIds,
                        },
                    },
                    select: {
                        postId: true,
                    },
                }),

                prisma.postLike.findMany({
                    where: {
                        userId: req.userId,
                        postId: {
                            in: postIds,
                        },
                    },
                    select: {
                        postId: true,
                    },
                }),
            ]);

            savedPostIds = savedPosts.map((savedPost) => savedPost.postId);
            likedPostIds = likedPosts.map((likedPost) => likedPost.postId);
        }

        const savedPostIdsSet = new Set(savedPostIds);
        const likedPostIdsSet = new Set(likedPostIds);
        const pages = getPagesCount(total, limit);

        return res.status(200).json({
            data: posts.map((post) =>
                mapPostToPreview(post, savedPostIdsSet.has(post.id), likedPostIdsSet.has(post.id)),
            ),
            page,
            limit,
            total,
            pages,
        });
    } catch (error) {
        console.error('GET /posts error:', error);

        return res.status(500).json({
            message: 'Failed to fetch posts',
        });
    }
});
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by id
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to fetch post
 */
app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
                stats: true,
                sections: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.status(200).json(mapPostToDetails(post));
    } catch (error) {
        console.error('GET /posts/:id error:', error);

        return res.status(500).json({
            message: 'Failed to fetch post',
        });
    }
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories list
 *       500:
 *         description: Failed to fetch categories
 */
app.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                order: 'asc',
            },
        });

        return res.status(200).json([
            {
                id: 'all',
                label: 'All',
                value: 'all',
            },
            ...categories.map((category) => ({
                id: category.id,
                label: category.label,
                value: category.value,
            })),
        ]);
    } catch (error) {
        console.error('GET /categories error:', error);

        return res.status(500).json({
            message: 'Failed to fetch categories',
        });
    }
});

/**
 * @swagger
 * /saved-posts/{postId}:
 *   post:
 *     summary: Save post
 *     tags:
 *       - Saved posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *     responses:
 *       201:
 *         description: Post saved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to save post
 */
app.post('/saved-posts/:postId', authenticateAccessToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        const savedPost = await prisma.savedPost.upsert({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
            update: {},
            create: {
                userId,
                postId,
            },
        });

        return res.status(201).json({
            message: 'Post saved',
            savedPost,
        });
    } catch (error) {
        console.error('POST /saved-posts/:postId error:', error);

        return res.status(500).json({
            message: 'Failed to save post',
        });
    }
});

/**
 * @swagger
 * /saved-posts:
 *   get:
 *     summary: Get saved posts
 *     tags:
 *       - Saved posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 3
 *     responses:
 *       200:
 *         description: Paginated saved posts list
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch saved posts
 */
app.get('/saved-posts', authenticateAccessToken, async (req, res) => {
    try {
        const userId = req.userId;

        const { page, limit, skip } = getPaginationParams(req);

        const [total, savedPosts] = await prisma.$transaction([
            prisma.savedPost.count({
                where: {
                    userId,
                },
            }),

            prisma.savedPost.findMany({
                where: {
                    userId,
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    post: {
                        include: {
                            author: true,
                            stats: true,
                        },
                    },
                },
            }),
        ]);

        const pages = getPagesCount(total, limit);

        return res.status(200).json({
            data: savedPosts.map((savedPost) => mapPostToPreview(savedPost.post, true)),
            page,
            limit,
            total,
            pages,
        });
    } catch (error) {
        console.error('GET /saved-posts error:', error);

        return res.status(500).json({
            message: 'Failed to fetch saved posts',
        });
    }
});

/**
 * @swagger
 * /saved-posts/{postId}:
 *   delete:
 *     summary: Remove post from saved
 *     tags:
 *       - Saved posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *     responses:
 *       200:
 *         description: Post removed from saved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Saved post not found
 *       500:
 *         description: Failed to remove saved post
 */
app.delete('/saved-posts/:postId', authenticateAccessToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const deleted = await prisma.savedPost.deleteMany({
            where: {
                userId,
                postId,
            },
        });

        if (deleted.count === 0) {
            return res.status(404).json({
                message: 'Saved post not found',
            });
        }

        return res.status(200).json({
            message: 'Post removed from saved',
            postId,
        });
    } catch (error) {
        console.error('DELETE /saved-posts/:postId error:', error);

        return res.status(500).json({
            message: 'Failed to remove saved post',
        });
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register user with avatar
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *               - avatar
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               username:
 *                 type: string
 *                 example: ivan
 *               password:
 *                 type: string
 *                 example: "123456"
 *               description:
 *                 type: string
 *                 example: Frontend developer
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Invalid registration data or avatar
 *       409:
 *         description: User already exists
 *       500:
 *         description: Failed to register user
 */
app.post(
    '/register',
    uploadAvatar,

    async (req, res) => {
        let savedAvatarSrc = null;
        let userWasCreated = false;

        try {
            const { email, username, password, description } = req.body;

            if (
                typeof email !== 'string' ||
                typeof username !== 'string' ||
                typeof password !== 'string'
            ) {
                return res.status(400).json({
                    message: 'email, username and password are required',
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: 'Avatar is required',
                });
            }

            const normalizedEmail = email.trim().toLowerCase();

            const normalizedUsername = username.trim();

            const normalizedDescription =
                typeof description === 'string' && description.trim() ? description.trim() : null;

            if (!normalizedEmail || !normalizedUsername || !password) {
                return res.status(400).json({
                    message: 'email, username and password must not be empty',
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    message: 'Password must contain at least 6 characters',
                });
            }

            const userAlreadyExists = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            email: normalizedEmail,
                        },
                        {
                            username: normalizedUsername,
                        },
                    ],
                },
            });

            if (userAlreadyExists) {
                return res.status(409).json({
                    message: 'User already exists',
                });
            }

            try {
                savedAvatarSrc = await saveAvatar(req.file.buffer);
            } catch (error) {
                console.error('Avatar processing error:', error);

                return res.status(400).json({
                    message: 'The uploaded file is not a valid image',
                });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    email: normalizedEmail,
                    username: normalizedUsername,
                    passwordHash,
                    description: normalizedDescription,
                    avatarSrc: savedAvatarSrc,
                },
            });

            userWasCreated = true;

            const authResponse = await createAuthResponse({
                user: newUser,
                res,
                prisma,
            });

            return res.status(201).json(authResponse);
        } catch (error) {
            console.error('POST /register error:', error);

            if (savedAvatarSrc && !userWasCreated) {
                await deleteAvatar(savedAvatarSrc);
            }

            if (error?.code === 'P2002') {
                return res.status(409).json({
                    message: 'User already exists',
                });
            }

            return res.status(500).json({
                message: 'Failed to register user',
            });
        }
    },
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to login
 */
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'email and password are required',
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }

        const authResponse = await createAuthResponse({
            user,
            res,
            prisma,
        });

        return res.status(200).json(authResponse);
    } catch (error) {
        console.error('POST /login error:', error);

        return res.status(500).json({
            message: 'Failed to login',
        });
    }
});

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Failed to refresh token
 */
app.post('/refresh', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: 'Refresh token is required',
            });
        }

        const refreshTokenHash = hashRefreshToken(refreshToken);

        const session = await prisma.refreshSession.findUnique({
            where: {
                refreshTokenHash,
            },
            include: {
                user: true,
            },
        });

        if (!session) {
            clearRefreshTokenCookie(res);

            return res.status(401).json({
                message: 'Invalid refresh token',
            });
        }

        if (session.expiresAt < new Date()) {
            await prisma.refreshSession.delete({
                where: {
                    id: session.id,
                },
            });

            clearRefreshTokenCookie(res);

            return res.status(401).json({
                message: 'Refresh token expired',
            });
        }

        await prisma.refreshSession.delete({
            where: {
                id: session.id,
            },
        });

        const authResponse = await createAuthResponse({
            user: session.user,
            res,
            prisma,
        });

        return res.status(200).json(authResponse);
    } catch (error) {
        console.error('POST /refresh error:', error);

        return res.status(500).json({
            message: 'Failed to refresh token',
        });
    }
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Auth
 *     responses:
 *       204:
 *         description: User logged out
 *       500:
 *         description: Failed to logout
 */
app.post('/logout', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const refreshTokenHash = hashRefreshToken(refreshToken);

            await prisma.refreshSession.deleteMany({
                where: {
                    refreshTokenHash,
                },
            });
        }

        clearRefreshTokenCookie(res);

        return res.status(204).send();
    } catch (error) {
        console.error('POST /logout error:', error);

        return res.status(500).json({
            message: 'Failed to logout',
        });
    }
});

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch user
 */
app.get('/me', authenticateAccessToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            user: getPublicUser(user),
        });
    } catch (error) {
        console.error('GET /me error:', error);

        return res.status(500).json({
            message: 'Failed to fetch user',
        });
    }
});
/**
 * @swagger
 * /posts/{postId}/like:
 *   post:
 *     summary: Like post
 *     tags:
 *       - Post likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *     responses:
 *       200:
 *         description: Post liked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   example: quantum-leap
 *                 isLiked:
 *                   type: boolean
 *                   example: true
 *                 likes:
 *                   type: number
 *                   example: 12
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to like post
 */
app.post('/posts/:postId/like', authenticateAccessToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const result = await prisma.$transaction(async (tx) => {
            const post = await tx.post.findUnique({
                where: {
                    id: postId,
                },
                select: {
                    id: true,
                },
            });

            if (!post) {
                return null;
            }

            await tx.postLike.upsert({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
                update: {},
                create: {
                    userId,
                    postId,
                },
            });

            const likes = await tx.postLike.count({
                where: {
                    postId,
                },
            });

            await tx.postStats.upsert({
                where: {
                    postId,
                },
                update: {
                    likes,
                },
                create: {
                    postId,
                    likes,
                },
            });

            return {
                postId,
                isLiked: true,
                likes,
            };
        });

        if (!result) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('POST /posts/:postId/like error:', error);

        return res.status(500).json({
            message: 'Failed to like post',
        });
    }
});
/**
 * @swagger
 * /posts/{postId}/like:
 *   delete:
 *     summary: Unlike post
 *     tags:
 *       - Post likes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *     responses:
 *       200:
 *         description: Post unliked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   example: quantum-leap
 *                 isLiked:
 *                   type: boolean
 *                   example: false
 *                 likes:
 *                   type: number
 *                   example: 11
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to unlike post
 */
app.delete('/posts/:postId/like', authenticateAccessToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;

        const result = await prisma.$transaction(async (tx) => {
            const post = await tx.post.findUnique({
                where: {
                    id: postId,
                },
                select: {
                    id: true,
                },
            });

            if (!post) {
                return null;
            }

            await tx.postLike.deleteMany({
                where: {
                    userId,
                    postId,
                },
            });

            const likes = await tx.postLike.count({
                where: {
                    postId,
                },
            });

            await tx.postStats.upsert({
                where: {
                    postId,
                },
                update: {
                    likes,
                },
                create: {
                    postId,
                    likes,
                },
            });

            return {
                postId,
                isLiked: false,
                likes,
            };
        });

        if (!result) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('DELETE /posts/:postId/like error:', error);

        return res.status(500).json({
            message: 'Failed to unlike post',
        });
    }
});
/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create comment for post
 *     tags:
 *       - Post comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Very interesting post
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cm123abc
 *                     content:
 *                       type: string
 *                       example: Very interesting post
 *                     postId:
 *                       type: string
 *                       example: quantum-leap
 *                     userId:
 *                       type: string
 *                       example: user-123
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     author:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: user-123
 *                         username:
 *                           type: string
 *                           example: ivan
 *                 comments:
 *                   type: integer
 *                   example: 28
 *       400:
 *         description: Comment content is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to create comment
 */
app.post('/posts/:postId/comments', authenticateAccessToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { postId } = req.params;
        const { content } = req.body;

        const normalizedContent = typeof content === 'string' ? content.trim() : '';

        if (!normalizedContent) {
            return res.status(400).json({
                message: 'Comment content is required',
            });
        }

        const result = await prisma.$transaction(async (tx) => {
            const post = await tx.post.findUnique({
                where: {
                    id: postId,
                },
                select: {
                    id: true,
                },
            });

            if (!post) {
                return null;
            }

            const comment = await tx.comment.create({
                data: {
                    content: normalizedContent,
                    postId,
                    userId,
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });

            const comments = await tx.comment.count({
                where: {
                    postId,
                },
            });

            await tx.postStats.upsert({
                where: {
                    postId,
                },
                update: {
                    comments,
                },
                create: {
                    postId,
                    comments,
                },
            });

            return {
                comment,
                comments,
            };
        });

        if (!result) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.status(201).json(result);
    } catch (error) {
        console.error('POST /posts/:postId/comments error:', error);

        return res.status(500).json({
            message: 'Failed to create comment',
        });
    }
});
/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get post comments
 *     tags:
 *       - Post comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: quantum-leap
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         example: 10
 *     responses:
 *       200:
 *         description: Paginated post comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: cm123abc
 *                       content:
 *                         type: string
 *                         example: Very interesting post
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       author:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: user-123
 *                           username:
 *                             type: string
 *                             example: ivan
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 27
 *                 pages:
 *                   type: integer
 *                   example: 3
 *       404:
 *         description: Post not found
 *       500:
 *         description: Failed to fetch comments
 */
app.get('/posts/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { page, limit, skip } = getPaginationParams(req, 10);

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
            },
        });

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        const [total, comments] = await prisma.$transaction([
            prisma.comment.count({
                where: {
                    postId,
                },
            }),

            prisma.comment.findMany({
                where: {
                    postId,
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            }),
        ]);

        const pages = getPagesCount(total, limit);

        return res.status(200).json({
            data: comments,
            page,
            limit,
            total,
            pages,
        });
    } catch (error) {
        console.error('GET /posts/:postId/comments error:', error);

        return res.status(500).json({
            message: 'Failed to fetch comments',
        });
    }
});
app.listen(4000, () => {
    console.log('Auth backend started on http://localhost:4000');
});
