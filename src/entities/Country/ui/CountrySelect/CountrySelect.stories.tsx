import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CountrySelect } from './CountrySelect';

const meta: Meta<typeof CountrySelect> = {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};
