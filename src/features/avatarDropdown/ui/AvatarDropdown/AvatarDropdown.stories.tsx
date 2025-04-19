import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { AvatarDropdown } from './AvatarDropdown';

const meta: Meta<typeof AvatarDropdown> = {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof AvatarDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
