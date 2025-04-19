import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Card } from './Card';
import { Text } from '../Text/Text';

const meta: Meta<typeof Card> = {
    title: 'shared/Card',
    component: Card,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        children: <Text title="test" text="text text" />,
    },
};
