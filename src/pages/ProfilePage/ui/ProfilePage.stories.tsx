import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import TestAvatar from '@/shared/assets/tests/storybook.jpg';
import ProfilePage from './ProfilePage';

const profileFormTestData = {
    first: 'Aleksei',
    lastname: 'Moiseenko',
    age: 33,
    currency: Currency.USD,
    country: Country.Armenia,
    city: 'Moscow',
    username: 'admin',
    avatar: TestAvatar,
};

const meta: Meta<typeof ProfilePage> = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    decorators: [
        StoreDecorator({
            profile: {
                form: profileFormTestData,
                readonly: true,
            },
        }),
    ],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.DARK)],
};
