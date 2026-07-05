import { describe, expect, it } from "vitest";
import { validateForm } from "./validateForm";

describe('validateForm', () => {
    it('returns errors when email and password are empty', 
        () => {
            expect(
                validateForm({
                        email: '',
                        password: '',
                        rememberMe: false,
                })
            ).toEqual({
                 email: 'Enter email',
                 password: 'Enter password',
            })
        }
    );
    it('returns errors when form is empty', 
        () => {
            expect(
            validateForm({
                email: 'test@gmail.com',
                password: '123456'
            })
        ).toEqual({})
        }
    );
    it('returns error when email is invalid but password is valid',() => {
        expect(validateForm({
            email: 'test',
            password: '123456',
        }
    )
).toEqual({
    email: 'Invalid email'
})
    });
    it('returns error when email is valid but password is invalid', 
        () => {
            expect(validateForm({
                email:'test@gmail.com',
                password: '2,4,5',
            })).toEqual({
                password: 'The password must be at least 6 characters long'
            })
        }
    )

})