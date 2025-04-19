import { type ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { type Reducer } from '@reduxjs/toolkit';
import { type ReduxStoreWithManager } from '@/app/providers/StoreProvider';
// eslint-disable-next-line alexey4717-plugin/layer-imports
import { type StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<RootState[name]>>;
};

interface ReduxAsyncSliceInjectorProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader = ({
    children,
    reducers,
    removeAfterUnmount = true,
}: ReduxAsyncSliceInjectorProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];

            // Добавляем новый редьюсер только если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.keys(reducers).forEach((name) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return <>{children}</>;
};
