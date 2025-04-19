import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentCard } from './CommentCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta: Meta<typeof CommentCard> = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalArgs = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
};

export const Normal: Story = {
    args: normalArgs,
};

export const NormalRedesigned: Story = {
    args: normalArgs,
    decorators: [NewDesignDecorator],
};

export const Loading: Story = {
    args: {
        comment: {
            id: '1',
            text: 'hello world',
            user: { id: '1', username: 'Vasya' },
        },
        isLoading: true,
    },
};
