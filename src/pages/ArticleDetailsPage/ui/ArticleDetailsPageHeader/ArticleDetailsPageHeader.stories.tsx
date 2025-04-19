import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

const meta: Meta<typeof ArticleDetailsPageHeader> = {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleDetailsPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
