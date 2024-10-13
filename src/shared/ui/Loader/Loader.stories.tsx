import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Loader } from './Loader';

const meta = {
    title: 'shared/Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    args: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoaderLight: Story = {
    args: {},
};

export const LoaderDark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
