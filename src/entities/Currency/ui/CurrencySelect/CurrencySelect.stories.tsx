import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CurrencySelect } from './CurrencySelect';

const meta: Meta<typeof CurrencySelect> = {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof CurrencySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
