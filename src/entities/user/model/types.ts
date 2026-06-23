type Role = 'user' | 'admin';

export type User = {
    id: string;
    email: string;
    name: string;
    role: Role;
};
