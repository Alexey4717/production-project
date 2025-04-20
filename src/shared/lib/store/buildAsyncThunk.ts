import {
    createAsyncThunk,
    type AsyncThunk,
    type AsyncThunkPayloadCreator,
    type ThunkDispatch,
    type AnyAction,
    unwrapResult,
} from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

type UseThunkReturn<Returned, ThunkArg> = (
    arg: ThunkArg & undefined,
) => Promise<Returned>;

// TODO попробовать заюзать позже
export function buildAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends { state?: unknown } = object,
>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
        Returned,
        ThunkArg,
        ThunkApiConfig
    >,
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> & {
    useThunk: () => UseThunkReturn<Returned, ThunkArg>;
} {
    const thunk = createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(
        typePrefix,
        payloadCreator,
    );

    const useThunk = (): UseThunkReturn<Returned, ThunkArg> => {
        const dispatch = useAppDispatch() as ThunkDispatch<
            unknown,
            unknown,
            AnyAction
        >;

        return (arg: ThunkArg & undefined) => {
            const action = thunk(arg) as unknown as AnyAction;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return dispatch(action).then(unwrapResult as any);
        };
    };

    return Object.assign(thunk, { useThunk });
}
