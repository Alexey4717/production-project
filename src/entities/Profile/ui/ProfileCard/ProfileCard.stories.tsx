import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import TestAvatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        first: 'Aleksei',
        lastname: 'Moiseenko',
        age: 33,
        currency: Currency.USD,
        country: Country.Armenia,
        city: 'Moscow',
        username: 'admin',
        avatar: TestAvatar,
    },
};

export const withError = Template.bind({});
withError.args = {
    // error: [ValidateProfileError.NO_DATA],
    error: 'error',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
