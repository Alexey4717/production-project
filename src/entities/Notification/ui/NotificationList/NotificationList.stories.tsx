import { http, HttpResponse } from 'msw';
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationList } from './NotificationList';

const meta: Meta<typeof NotificationList> = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
    parameters: {
        msw: {
            handlers: [
                http.get(`${__API__}/notifications`, () => {
                    return HttpResponse.json(
                        [
                            {
                                id: '1',
                                title: 'Уведомление',
                                description: 'Текст уведомления',
                            },
                            {
                                id: '2',
                                title: 'Уведомление 2',
                                description: 'Текст уведомления',
                            },
                            {
                                id: '3',
                                title: 'Уведомление 3',
                                description: 'Текст уведомления',
                            },
                        ],
                        { status: 200 },
                    );
                }),
            ],
        },
    },
};
