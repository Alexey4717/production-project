import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AppLink, AppLinkTheme } from './AppLink';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    args: {
        children: 'Text',
        to: '/',
    },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
    args: {
        theme: AppLinkTheme.PRIMARY,
    },
};

export const PrimaryDark: Story = {
    args: {
        theme: AppLinkTheme.PRIMARY,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SecondaryLight: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY,
    },
};

export const SecondaryDark: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const RedLight: Story = {
    args: {
        theme: AppLinkTheme.RED,
    },
};

export const RedDark: Story = {
    args: {
        theme: AppLinkTheme.RED,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
