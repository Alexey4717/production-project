import { buildSelector } from '@/shared/lib/store';

export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
);

export const [useCounterValue2, getCounterValue2] = buildSelector(
    getCounterValue,
    // TODO разобраться с типизацией
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (state: number) => {
        return state! + 5;
    },
);

export const [useCounterValue3, getCounterValue3] = buildSelector(
    getCounterValue,
    getCounterValue2,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (state1: number, state2: number) => {
        return state1 + state2;
    },
);
