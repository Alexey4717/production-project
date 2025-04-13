import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from '../../../assets/tests/storybook.jpg';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Avatar>; // Используем Meta вместо ComponentMeta

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />; // Используем StoryFn вместо Story

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: AvatarImg,
};
