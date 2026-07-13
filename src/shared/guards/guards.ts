export  const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};
export const isStringArray = (value: unknown): value is string[] => {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
};