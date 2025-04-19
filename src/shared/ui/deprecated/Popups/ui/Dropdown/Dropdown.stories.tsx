import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
    title: 'shared/Dropdown',
    component: Dropdown,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        trigger: <Button>Open</Button>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
};
