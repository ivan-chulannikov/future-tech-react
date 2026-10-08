import { randomUUID } from 'node:crypto';
import { mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const AVATAR_SIZE = 256;

const avatarsDirectory = path.resolve(
    process.cwd(),
    'public',
    'uploads',
    'avatars',
);

export const saveAvatar = async (buffer) => {
    await mkdir(avatarsDirectory, {
        recursive: true,
    });

    const filename = `${randomUUID()}.webp`;

    const absolutePath = path.join(
        avatarsDirectory,
        filename,
    );

    await sharp(buffer)
        .rotate()
        .resize(AVATAR_SIZE, AVATAR_SIZE, {
            fit: 'cover',
            position: 'centre',
        })
        .webp({
            quality: 82,
        })
        .toFile(absolutePath);

    return `/uploads/avatars/${filename}`;
};

export const deleteAvatar = async (avatarSrc) => {
    if (!avatarSrc) {
        return;
    }

    const filename = path.basename(avatarSrc);

    const absolutePath = path.join(
        avatarsDirectory,
        filename,
    );

    try {
        await unlink(absolutePath);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Failed to delete avatar:', error);
        }
    }
};