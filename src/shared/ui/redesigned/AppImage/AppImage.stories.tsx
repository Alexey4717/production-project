import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { AppImage } from './AppImage';

const meta: Meta<typeof AppImage> = {
    title: 'shared/AppImage',
    component: AppImage,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
