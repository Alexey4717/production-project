import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist'; // папка куда билдится redux
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useAppDispatch();
        return bindActionCreators(slice.actions, dispatch);
    };

    return {
        ...slice,
        useActions,
    };
}
