import { ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import { AsyncThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<
    Return,
    Arg,
    {
        rejectValue: RejectedValue;
        state: RootState;
        extra: ThunkExtraArg;
        dispatch?: ThunkDispatch<RootState, ThunkExtraArg, any>;
    }
>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios, { shallow: false });

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;
    getState: () => RootState;
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;
    api: jest.MockedFunctionDeep<AxiosStatic>;
    navigate: jest.MockedFn<any>;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
        state?: DeepPartial<RootState>,
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as RootState);
        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    async callThunk(arg?: Arg) {
        const action = this.actionCreator(arg as Arg);
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            // navigate: this.navigate,
        });

        return result;
    }
}
