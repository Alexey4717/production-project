import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

type Selector<TResult, TArgs extends unknown[] = []> = (
    state: RootState,
    ...args: TArgs
) => TResult;

type UseSelectorHook<TResult, TArgs extends unknown[] = []> = (
    ...args: TArgs
) => TResult;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectorResults<T extends Selector<any, any>[]> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof T]: T[K] extends Selector<infer R, any> ? R : never;
};

export function buildSelector<TResult, TArgs extends unknown[] = []>(
    selector: Selector<TResult, TArgs>,
): [UseSelectorHook<TResult, TArgs>, Selector<TResult, TArgs>];

export function buildSelector<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TSelectors extends Selector<any, any>[],
    TResult,
    TArgs extends unknown[] = [],
>(
    ...args: [
        ...selectors: TSelectors,
        combiner: (...values: SelectorResults<TSelectors>) => TResult,
    ]
): [UseSelectorHook<TResult, TArgs>, Selector<TResult, TArgs>];

export function buildSelector(...args: unknown[]): unknown {
    const selectors = [...args.slice(0, -1)] as Selector<unknown, unknown[]>[];
    const combiner = args[args.length - 1] as (...values: unknown[]) => unknown;

    const useSelectorHook = (...hookArgs: unknown[]) => {
        return useSelector((state: RootState) => {
            if (selectors.length === 0) {
                return combiner(state, ...hookArgs);
            }

            const createdSelector = createSelector(selectors, combiner);
            return createdSelector(state, ...hookArgs);
        });
    };

    const selector = (state: RootState, ...selectorArgs: unknown[]) => {
        if (selectors.length === 0) {
            return combiner(state, ...selectorArgs);
        }

        const createdSelector = createSelector(selectors, combiner);
        return createdSelector(state, ...selectorArgs);
    };

    return [useSelectorHook, selector];
}
