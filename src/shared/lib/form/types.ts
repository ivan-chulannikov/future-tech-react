export type FormErrors<TValues> = Partial<Record<keyof TValues, string>>;
export type FormTouched<TValues> = Partial<Record<keyof TValues, boolean>>;
export type FormValidator<TValues> = (values: TValues) => FormErrors<TValues>;
export type FormSubmitHandler<TValues> = (values: TValues) => void | Promise<void>;
