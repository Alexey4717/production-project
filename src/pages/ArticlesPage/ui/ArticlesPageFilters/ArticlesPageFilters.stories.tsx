import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticlesPageFilters } from './ArticlesPageFilters';

const meta: Meta<typeof ArticlesPageFilters> = {
    title: 'pages/ArticlesPage/ArticlesPageFilters',
    component: ArticlesPageFilters,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticlesPageFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
