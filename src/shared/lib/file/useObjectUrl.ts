import { useEffect, useMemo } from 'react';

export const useObjectUrl = (file: File | Blob | null) => {
    const objectUrl = useMemo(() => {
        return file ? URL.createObjectURL(file) : null;
    }, [file]);

    useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

    return objectUrl;
};
