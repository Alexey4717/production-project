import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '../../consts/editableProfileCardConsts';
import { validateProfileData } from './validateProfileData';

const profileTestData = {
    first: 'Aleksei',
    lastname: 'Moiseenko',
    age: 33,
    currency: Currency.USD,
    country: Country.Armenia,
    city: 'Moscow',
    username: 'admin',
};

describe('validateProfileData.test', () => {
    test('success', async () => {
        const result = validateProfileData(profileTestData);
        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({
            ...profileTestData,
            first: '',
            lastname: '',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async () => {
        const result = validateProfileData({
            ...profileTestData,
            age: undefined,
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect country', async () => {
        const result = validateProfileData({
            ...profileTestData,
            country: undefined,
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('incorrect country', async () => {
        const result = validateProfileData({});
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('data not passed', async () => {
        const result = validateProfileData();
        expect(result).toEqual([ValidateProfileError.NO_DATA]);
    });
});
