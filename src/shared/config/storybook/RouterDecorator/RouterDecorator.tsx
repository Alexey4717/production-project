import { ReactRenderer } from '@storybook/react/*';
import 'app/styles/index.scss';
import { DecoratorFunction } from 'storybook/internal/types';
import { Args } from '@storybook/csf';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator: DecoratorFunction<ReactRenderer, Args> = (story) => {
    return (
        <BrowserRouter>
            {story()}
        </BrowserRouter>
    );
};
