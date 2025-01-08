import { StoreProvider } from './ui/StoreProvider';
import { type AppDispatch, createReduxStore } from './config/store';
import type { StateSchema, ReduxStoreWithManager } from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    AppDispatch,
};
