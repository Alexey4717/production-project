import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ArticleSortSelector } from './ArticleSortSelector';

export default {
    title: 'features/ArticleSortSelector',
    component: ArticleSortSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleSortSelector>;

const Template: StoryFn<typeof ArticleSortSelector> = (args) => (
    <ArticleSortSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
