import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticlesPage from './ArticlesPage';

const meta: Meta<typeof ArticlesPage> = {
    title: 'pages/ArticlesPage/ArticlesPage',
    component: ArticlesPage,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
