import { ValidateProfileError } from '../../consts/editableProfileCardConsts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
    test('should return error', () => {
        const validateErrors = [
            ValidateProfileError.NO_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ];
        const state: DeepPartial<RootState> = {
            profile: {
                validateErrors,
            },
        };

        expect(getProfileValidateErrors(state as RootState)).toEqual(
            validateErrors,
        );
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getProfileValidateErrors(state as RootState)).toEqual(undefined);
    });
});
