import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
    test('should return error', () => {
        const state: DeepPartial<RootState> = {
            profile: {
                readonly: true,
            },
        };

        expect(getProfileReadonly(state as RootState)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<RootState> = {};
        expect(getProfileReadonly(state as RootState)).toEqual(undefined);
    });
});
