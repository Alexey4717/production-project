import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileForm } from './getProfileForm';

const profileFormTestData = {
    first: 'Aleksei',
    lastname: 'Moiseenko',
    age: 33,
    currency: Currency.USD,
    country: Country.Armenia,
    city: 'Moscow',
    username: 'admin',
};

describe('getProfileForm.test', () => {
    test('should return error', () => {
        const state: DeepPartial<RootState> = {
            profile: {
                form: profileFormTestData,
            },
        };

        expect(getProfileForm(state as RootState)).toEqual(profileFormTestData);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getProfileForm(state as RootState)).toEqual(undefined);
    });
});
