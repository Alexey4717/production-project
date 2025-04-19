import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleSortSelector } from './ArticleSortSelector';

const meta: Meta<typeof ArticleSortSelector> = {
    title: 'features/ArticleSortSelector',
    component: ArticleSortSelector,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleSortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
