import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleTypeTabs } from './ArticleTypeTabs';

const meta: Meta<typeof ArticleTypeTabs> = {
    title: 'features/ArticleTypeTabs',
    component: ArticleTypeTabs,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
