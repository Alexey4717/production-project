import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AddCommentForm from './AddCommentForm';

const meta: Meta<typeof AddCommentForm> = {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        onSendComment: action('onSendComment'), // TODO возможно изменить код
    },
};
