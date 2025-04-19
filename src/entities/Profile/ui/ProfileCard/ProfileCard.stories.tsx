import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta: Meta<typeof ProfileCard> = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const primaryArgs = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Ukraine,
        lastname: 'ulbi tv',
        first: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar,
    },
};

export const Normal: Story = {
    args: primaryArgs,
};

export const NormalRedesigned: Story = {
    args: primaryArgs,
    decorators: [NewDesignDecorator],
};

export const withError: Story = {
    args: {
        error: 'true',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};
