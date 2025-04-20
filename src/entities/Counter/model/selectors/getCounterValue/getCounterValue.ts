import { buildSelector } from '@/shared/lib/store';

export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
);

export const [useCounterValue2, getCounterValue2] = buildSelector(
    getCounterValue,
    (state) => {
        return state! + 5;
    },
);

export const [useCounterValue3, getCounterValue3] = buildSelector(
    getCounterValue,
    getCounterValue2,
    (state1, state2) => {
        return state1 + state2;
    },
);

export const [useCounterValue4, getCounterValue4] = buildSelector(
    getCounterValue,
    getCounterValue2,
    getCounterValue3,
    (state1, state2, state3) => {
        return state1 + state2 + state3;
    },
);
