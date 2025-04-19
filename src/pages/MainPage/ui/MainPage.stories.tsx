import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
    title: 'pages/MainPage',
    component: MainPage,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
