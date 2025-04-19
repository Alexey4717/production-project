import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationButton } from './NotificationButton';

const meta: Meta<typeof NotificationButton> = {
    title: 'features/NotificationButton',
    component: NotificationButton,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof NotificationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
