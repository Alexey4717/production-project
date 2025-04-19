import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Input } from '../Input/Input';

const meta: Meta<typeof Input> = {
    title: 'shared/Input',
    component: Input,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Type text',
        value: '123123',
    },
};
