import { StoreProvider } from './ui/StoreProvider';
import { type AppDispatch, createReduxStore } from './config/store';
import type {
    StateSchema,
    ReduxStoreWithManager,
    ThunkConfig,
    StateSchemaKey,
} from './config/StateSchema';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    ThunkConfig,
    AppDispatch,
    StateSchemaKey,
};
