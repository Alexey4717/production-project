import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
    test('should return error', () => {
        const error = '123';
        const state: DeepPartial<RootState> = {
            profile: {
                error,
            },
        };

        expect(getProfileError(state as RootState)).toEqual(error);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getProfileError(state as RootState)).toEqual(undefined);
    });
});
