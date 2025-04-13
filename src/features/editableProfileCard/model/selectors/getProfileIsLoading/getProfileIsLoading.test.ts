import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading.test', () => {
    test('should return error', () => {
        const state: DeepPartial<RootState> = {
            profile: {
                isLoading: true,
            },
        };

        expect(getProfileIsLoading(state as RootState)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getProfileIsLoading(state as RootState)).toEqual(undefined);
    });
});
