export type LoginFormValues = {
    email: string;
    password: string;
    rememberMe?: boolean;
};
export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreement: boolean;
    description: string;
    userAvatar: File | null;
};
export type LoginFormTouched = {
    email?: boolean;
    password?: boolean;
    rememberMe?: boolean;
};
export type RegisterFormTouched = {
    name?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
    agreement?: boolean;
    description?: boolean;
    userAvatar?: boolean;
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;
export interface AuthUser {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    description?: string;
}
export type AuthState = {
    user: AuthUser | null;
    accessToken: string | null;
};
export type AuthResponse = {
    user: AuthUser;
    accessToken: string;
};
