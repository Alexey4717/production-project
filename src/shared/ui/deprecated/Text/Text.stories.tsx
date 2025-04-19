import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/consts/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextSize, TextTheme } from './Text';

const meta: Meta<typeof Text> = {
    title: 'shared/Text',
    component: Text,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'Title lorem',
        text: 'Text lorem',
    },
};

export const Error: Story = {
    args: {
        title: 'Title lorem',
        text: 'Text lorem',
        theme: TextTheme.ERROR,
    },
};

export const onlyTitle: Story = {
    args: {
        title: 'Title lorem',
    },
};

export const onlyText: Story = {
    args: {
        text: 'Text lorem',
    },
};

export const PrimaryDark: Story = {
    args: {
        title: 'Title lorem',
        text: 'Text lorem',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyTitleDark: Story = {
    args: {
        title: 'Title lorem',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const onlyTextDark: Story = {
    args: {
        text: 'Text lorem',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const SizeS: Story = {
    args: {
        title: 'Title lorem',
        text: 'Text lorem',
        size: TextSize.S,
    },
};

export const SizeM: Story = {
    args: {
        title: 'Title lorem',
        text: 'Text lorem',
        size: TextSize.M,
    },
};

export const SizeL: Story = {
    args: {
        title: 'Title lorem',
        text: 'Text lorem',
        size: TextSize.L,
    },
};
