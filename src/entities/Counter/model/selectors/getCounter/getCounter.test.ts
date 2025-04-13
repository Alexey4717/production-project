import { getCounter } from './getCounter';

describe('getCounter', () => {
    test('should return counter', () => {
        const state: DeepPartial<RootState> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as RootState)).toStrictEqual({ value: 10 });
    });
});
