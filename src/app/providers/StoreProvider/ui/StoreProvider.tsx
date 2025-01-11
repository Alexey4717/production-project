import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate,
    );

    return (
        <Provider store={store}>
            {/* судя по всему несовместимости версий */}
            {/* @ts-ignore */}
            {children}
        </Provider>
    );
};
