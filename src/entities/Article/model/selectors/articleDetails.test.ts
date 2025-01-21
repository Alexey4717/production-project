import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsIsLoading,
    getArticleDetailsError,
} from './articleDetails';

const articleDetailsTestData = {
    fid: '1',
    title: 'title',
};

describe('getArticleDetailsData.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: articleDetailsTestData,
            },
        };

        expect(getArticleDetailsData(state as StateSchema)).toEqual(articleDetailsTestData);
        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(undefined);
    });

    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };

        expect(getArticleDetailsIsLoading(state as StateSchema)).toBe(true);
    });

    test('should return error', () => {
        const errorString = 'error';
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: errorString,
            },
        };

        expect(getArticleDetailsError(state as StateSchema)).toBe(errorString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(undefined);
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
