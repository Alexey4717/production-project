import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '../../model/consts/editableProfileCardConsts';
import { ProfileSchema } from '../../model/types/editableProfileCardSchema';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const profileTestData = {
    first: 'Aleksei',
    lastname: 'Moiseenko',
    age: 33,
    currency: Currency.USD,
    country: Country.Armenia,
    city: 'Moscow',
    username: 'admin',
};

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true),
            ),
        ).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data: profileTestData,
            form: { username: '' },
        };

        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data: profileTestData,
            form: profileTestData,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };

        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({
                    username: '123456',
                }),
            ),
        ).toEqual({
            form: { username: '123456' },
        });
    });

    // тестирование extraReducers
    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };

        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.pending, // по-сути это экшен
            ),
        ).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.fulfilled(profileTestData, ''),
            ),
        ).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: profileTestData,
            data: profileTestData,
        });
    });
});
