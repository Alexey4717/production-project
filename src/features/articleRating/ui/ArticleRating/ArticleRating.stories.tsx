import { http, HttpResponse } from 'msw';
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleRating from './ArticleRating';

const meta: Meta<typeof ArticleRating> = {
    title: 'features/ArticleRating',
    component: ArticleRating,
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                },
            },
        }),
    ],
} satisfies Meta<typeof ArticleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        articleId: '1',
    },
    parameters: {
        msw: {
            handlers: [
                http.get(
                    `${__API__}/article-ratings?userId=1&articleId=1`,
                    () => {
                        return HttpResponse.json(
                            [
                                {
                                    rate: 4,
                                },
                            ],
                            { status: 200 },
                        );
                    },
                ),
            ],
        },
    },
};

export const WithoutRating: Story = {
    args: {
        articleId: '1',
    },
    parameters: {
        msw: {
            handlers: [
                http.get(
                    `${__API__}/article-ratings?userId=1&articleId=1`,
                    () => {
                        return HttpResponse.json([], { status: 200 });
                    },
                ),
            ],
        },
    },
};
