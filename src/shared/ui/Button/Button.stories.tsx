import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'text',
    },
    decorators: [ThemeDecorator(Theme.DARK)], // передача декоратора в конкретные сторис, а не глобально в preview.ts
};

export const Clear: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.CLEAR,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OutlineLight: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE,
    },
};
export const OutlineDark: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
