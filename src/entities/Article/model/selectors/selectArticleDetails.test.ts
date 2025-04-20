import {
    selectArticleDetailsData,
    selectArticleDetailsIsLoading,
    selectArticleDetailsError,
} from './selectArticleDetails';

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

        expect(selectArticleDetailsData(state as RootState)).toEqual(
            articleDetailsTestData,
        );
        expect(selectArticleDetailsIsLoading(state as RootState)).toBe(
            undefined,
        );
    });

    test('should return isLoading', () => {
        const state: DeepPartial<RootState> = {
            articleDetails: {
                isLoading: true,
            },
        };

        expect(selectArticleDetailsIsLoading(state as RootState)).toBe(true);
    });

    test('should return error', () => {
        const errorString = 'error';
        const state: DeepPartial<RootState> = {
            articleDetails: {
                error: errorString,
            },
        };

        expect(selectArticleDetailsError(state as RootState)).toBe(errorString);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(selectArticleDetailsData(state as RootState)).toEqual(undefined);
        expect(selectArticleDetailsIsLoading(state as RootState)).toEqual(
            undefined,
        );
        expect(selectArticleDetailsError(state as RootState)).toEqual(
            undefined,
        );
    });
});
