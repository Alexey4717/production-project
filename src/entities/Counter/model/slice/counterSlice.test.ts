import { counterReducer, counterActions } from './counterSlice';
import { type CounterSchema } from '../types/counterSchema';

describe('counterSlice.test', () => {
    test('should work with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({
            value: 1,
        });
    });

    test('should decrement counter', () => {
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducer(state, counterActions.decrement())).toEqual({
            value: 9,
        });
    });

    test('should increment counter', () => {
        const state: CounterSchema = {
            value: 10,
        };
        expect(counterReducer(state, counterActions.increment())).toEqual({
            value: 11,
        });
    });
});
