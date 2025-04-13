import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileData } from './getProfileData';

const profileFormTestData = {
    first: 'Aleksei',
    lastname: 'Moiseenko',
    age: 33,
    currency: Currency.USD,
    country: Country.Armenia,
    city: 'Moscow',
    username: 'admin',
};

describe('getProfileData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<RootState> = {
            profile: {
                data: profileFormTestData,
            },
        };

        expect(getProfileData(state as RootState)).toEqual(profileFormTestData);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getProfileData(state as RootState)).toEqual(undefined);
    });
});
