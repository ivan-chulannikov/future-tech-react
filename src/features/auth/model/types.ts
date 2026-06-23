export type LoginFormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
};
export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;
export type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreement: boolean;
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
};

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;
