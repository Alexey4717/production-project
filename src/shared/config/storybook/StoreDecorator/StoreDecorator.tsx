import type { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import { addCommentFormReducer } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { articleDetailsReducer } from 'entities/Article';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// Для сторибука
const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{
            ...defaultAsyncReducers,
            ...(asyncReducers ?? {}),
        } as ReducersMapObject<StateSchema>}
    >
        <StoryComponent />
    </StoreProvider>
);
