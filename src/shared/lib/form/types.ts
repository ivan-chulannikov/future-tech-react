export type FormErrors<TValues> = Partial<Record<keyof TValues, string>>;
export type FormTouched<TValues> = Partial<Record<keyof TValues, boolean>>;
export type FormValidator<TValues> = (values: TValues) => FormErrors<TValues>;

export type FormActions = {
    reset: () => void;
};
export type FormSubmitHandler<TValues> = (
    values: TValues,
    actions: FormActions,
) => void | Promise<void>;
export type NestedObject = Record<string, unknown>;