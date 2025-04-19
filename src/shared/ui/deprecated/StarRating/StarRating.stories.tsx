import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
    title: 'shared/StarRating',
    component: StarRating,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
