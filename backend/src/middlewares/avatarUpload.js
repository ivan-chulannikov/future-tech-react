import multer from 'multer';

const allowedMimeTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
]);

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fields: 4,
    },

    fileFilter: (_req, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            callback(
                new Error(
                    'Avatar must be a JPG, PNG or WebP image',
                ),
            );

            return;
        }

        callback(null, true);
    },
});

export const uploadAvatar = (req, res, next) => {
    upload.single('avatar')(req, res, (error) => {
        if (!error) {
            next();
            return;
        }

        if (
            error instanceof multer.MulterError &&
            error.code === 'LIMIT_FILE_SIZE'
        ) {
            return res.status(400).json({
                message: 'Avatar must not exceed 5 MB',
            });
        }

        return res.status(400).json({
            message: error.message ?? 'Failed to upload avatar',
        });
    });
};