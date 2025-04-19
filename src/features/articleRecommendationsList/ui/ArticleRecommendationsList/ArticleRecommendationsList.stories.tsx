import { http, HttpResponse } from 'msw';
import type { Meta, StoryObj } from '@storybook/react';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const article: Article = {
    id: '1',
    img: '',
    createdAt: '',
    views: 123,
    user: { id: '1', username: '123' },
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'asfsa',
};

export const Normal: Story = {
    args: {},
    parameters: {
        msw: {
            handlers: [
                http.get(`${__API__}/articles?_limit=3`, () => {
                    return HttpResponse.json(
                        [
                            { ...article, id: '1' },
                            { ...article, id: '2' },
                            { ...article, id: '3' },
                        ],
                        { status: 200 },
                    );
                }),
            ],
        },
    },
};
