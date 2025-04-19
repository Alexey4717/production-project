import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Avatar } from './Avatar';
import AvatarImg from '../../../assets/tests/storybook.jpg';

const meta: Meta<typeof Avatar> = {
    title: 'shared/Avatar',
    component: Avatar,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        size: 150,
        src: AvatarImg,
    },
};

export const Small: Story = {
    args: {
        size: 50,
        src: AvatarImg,
    },
};
