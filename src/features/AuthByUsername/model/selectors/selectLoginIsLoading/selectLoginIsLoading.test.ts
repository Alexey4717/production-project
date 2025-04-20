import { selectLoginIsLoading } from './selectLoginIsLoading';

describe('selectLoginIsLoading.test', () => {
    test('should return isLoading true', () => {
        const state: DeepPartial<RootState> = {
            loginForm: {
                isLoading: true,
            },
        };

        expect(selectLoginIsLoading(state as RootState)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(selectLoginIsLoading(state as RootState)).toEqual(false);
    });
});
