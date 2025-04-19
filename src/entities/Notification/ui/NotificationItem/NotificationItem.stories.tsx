import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationItem } from './NotificationItem';

const meta: Meta<typeof NotificationItem> = {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
