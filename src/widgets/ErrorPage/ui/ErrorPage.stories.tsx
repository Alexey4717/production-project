import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/consts/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
    title: 'widgets/ErrorPage',
    component: ErrorPage,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
