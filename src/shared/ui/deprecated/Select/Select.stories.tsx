import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'shared/Select',
    component: Select,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Укажите значение',
        options: [
            { value: '123', content: 'option 1' },
            { value: '1234', content: 'option 2' },
        ],
    },
};
