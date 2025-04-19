import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentList } from './CommentList';

const meta: Meta<typeof CommentList> = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'hello world',
                user: { id: '1', username: 'Vasya' },
            },
            {
                id: '2',
                text: 'Comment 2',
                user: { id: '1', username: 'Petya' },
            },
        ],
    },
};

export const Loading: Story = {
    args: {
        comments: [],
        isLoading: true,
    },
};
