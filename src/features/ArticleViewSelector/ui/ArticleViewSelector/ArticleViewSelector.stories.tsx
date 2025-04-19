import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleViewSelector } from './ArticleViewSelector';

const meta: Meta<typeof ArticleViewSelector> = {
    title: 'features/ArticleViewSelector',
    component: ArticleViewSelector,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
