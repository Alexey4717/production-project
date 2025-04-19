import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import type { Combiner, SelectorArray } from 'reselect';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type Selector<T, Args extends any[]> = (state: RootState, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];
type CreateSelectorArgs<T> = [
    ...inputSelectors: SelectorArray<RootState>,
    combiner: Combiner<SelectorArray<RootState>, T>,
];

export function buildSelector<T, Args extends any[]>(
    ...selectors: Selector<T, Args>[]
): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useAppSelector((state: RootState) => {
            return selectors.length === 1
                ? selectors[0](state, ...args)
                : createSelector(...(selectors as CreateSelectorArgs<T>))(
                      state,
                      ...args,
                  );
        });
    };

    const selector: Selector<T, Args> | ReturnType<typeof createSelector> =
        selectors.length === 1
            ? selectors[0]
            : createSelector(...(selectors as CreateSelectorArgs<T>));

    return [useSelectorHook, selector];
}
