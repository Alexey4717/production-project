import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Page } from './Page';

const meta: Meta<typeof Page> = {
    title: 'widgets/Page',
    component: Page,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
