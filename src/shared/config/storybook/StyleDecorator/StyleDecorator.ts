import { ReactRenderer } from '@storybook/react/*';
import 'app/styles/index.scss';
import { DecoratorFunction } from 'storybook/internal/types';
import { Args } from '@storybook/csf';

export const StyleDecorator: DecoratorFunction<ReactRenderer, Args> = (story) => story();
