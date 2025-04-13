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
        const state: DeepPartial<RootState> = {
            articleDetails: {
                data: articleDetailsTestData,
            },
        };

        expect(getArticleDetailsData(state as RootState)).toEqual(
            articleDetailsTestData,
        );
        expect(getArticleDetailsIsLoading(state as RootState)).toBe(undefined);
    });

    test('should return isLoading', () => {
        const state: DeepPartial<RootState> = {
            articleDetails: {
                isLoading: true,
            },
        };

        expect(getArticleDetailsIsLoading(state as RootState)).toBe(true);
    });

    test('should return error', () => {
        const errorString = 'error';
        const state: DeepPartial<RootState> = {
            articleDetails: {
                error: errorString,
            },
        };

        expect(getArticleDetailsError(state as RootState)).toBe(errorString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getArticleDetailsData(state as RootState)).toEqual(undefined);
        expect(getArticleDetailsIsLoading(state as RootState)).toEqual(
            undefined,
        );
        expect(getArticleDetailsError(state as RootState)).toEqual(undefined);
    });
});
