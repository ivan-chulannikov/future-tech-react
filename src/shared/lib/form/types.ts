export type FormFieldPath<TValues> =
    | Extract<keyof TValues, string>
    | `${Extract<keyof TValues, string>}.${string}`;
export type FormErrors<TValues> = Partial<Record<FormFieldPath<TValues>, string>>;
export type FormTouched<TValues> = Partial<Record<FormFieldPath<TValues>, boolean>>;
export type FormValidator<TValues> = (values: TValues) => FormErrors<TValues>;

export type FormActions = {
    reset: () => void;
};
export type FormSubmitHandler<TValues> = (
    values: TValues,
    actions: FormActions,
) => void | Promise<void>;
export type NestedObject = Record<string, unknown>;
