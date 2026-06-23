const API_URL = 'http://localhost:3000';

export const apiClient = async <T>(
    endpoint: string,
    validate: (data: unknown) => data is T,
): Promise<T> => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Failed to load data');
    }
    const data: unknown = await response.json();
    if (!validate(data)) {
        throw new Error('Invalid server data');
    }
    return data;
};
