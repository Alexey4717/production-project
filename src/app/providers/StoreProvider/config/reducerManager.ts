import {
    type AnyAction,
    combineReducers,
    type ReducersMapObject,
    type Reducer,
} from '@reduxjs/toolkit';
import {
    MountedReducers,
    ReducerManager,
    StateSchema,
    StateSchemaKey,
} from './StateSchema';

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    // Названия редьюсеров, которые мы хотим удалить
    let keysToRemove: StateSchemaKey[] = [];

    const mountedRedusers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedRedusers, // TODO использовать getReducerMap
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key: StateSchemaKey) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedRedusers[key] = true;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            mountedRedusers[key] = false;
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
