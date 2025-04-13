import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
    test('should return counter value', () => {
        const state: DeepPartial<RootState> = {
            counter: { value: 10 },
        };
        expect(getCounterValue(state as RootState)).toEqual(10);
    });
});
