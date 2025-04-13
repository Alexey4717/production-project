import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
    test('should return isLoading true', () => {
        const state: DeepPartial<RootState> = {
            loginForm: {
                isLoading: true,
            },
        };

        expect(getLoginIsLoading(state as RootState)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getLoginIsLoading(state as RootState)).toEqual(false);
    });
});
