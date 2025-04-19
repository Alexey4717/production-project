import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { RatingCard } from './RatingCard';

const meta: Meta<typeof RatingCard> = {
    title: 'entities/Rating/RatingCard',
    component: RatingCard,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
