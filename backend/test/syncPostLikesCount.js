import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const syncPostLikesCount = async () => {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
        },
    });

    for (const post of posts) {
        const likes = await prisma.postLike.count({
            where: {
                postId: post.id,
            },
        });

        await prisma.postStats.upsert({
            where: {
                postId: post.id,
            },
            update: {
                likes,
            },
            create: {
                postId: post.id,
                likes,
            },
        });

        console.log(`${post.id}: ${likes}`);
    }
};

try {
    await syncPostLikesCount();
    console.log('Post likes count synced');
} catch (error) {
    console.error('Failed to sync post likes count:', error);
} finally {
    await prisma.$disconnect();
}