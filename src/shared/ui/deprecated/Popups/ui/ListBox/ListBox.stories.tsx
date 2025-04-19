import { type ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ListBox } from './ListBox';

const meta: Meta<typeof ListBox> = {
    title: 'shared/ListBox',
    component: ListBox,
    decorators: [
        StoreDecorator({}),
        (Story: ComponentType) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        value: '123',
        items: [
            { content: '1asfasfasf23', value: '123' },
            { content: '1asfasfasf21233', value: '1232' },
        ],
    },
};

export const topLeft: Story = {
    args: {
        direction: 'top left',
        value: '123',
        items: [
            { content: '1asfasfasf23', value: '123' },
            { content: '1asfasfasf21233', value: '1232' },
        ],
    },
};

export const topRight: Story = {
    args: {
        direction: 'top right',
        value: '123',
        items: [
            { content: '1asfasfasf23', value: '123' },
            { content: '1asfasfasf21233', value: '1232' },
        ],
    },
};

export const bottomLeft: Story = {
    args: {
        direction: 'bottom left',
        value: '123',
        items: [
            { content: '1asfasfasf23', value: '123' },
            { content: '1asfasfasf21233', value: '1232' },
        ],
    },
};

export const bottomRight: Story = {
    args: {
        direction: 'bottom right',
        value: '123',
        items: [
            { content: '1asfasfasf23', value: '123' },
            { content: '1asfasfasf21233', value: '1232' },
        ],
    },
};
