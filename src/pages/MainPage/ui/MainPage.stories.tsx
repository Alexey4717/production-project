import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import MainPage from './MainPage';

const meta = {
    title: 'pages/MainPage',
    component: MainPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    args: {},
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainPageLight: Story = {
    args: {},
};

export const MainPageDark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
