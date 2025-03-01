import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    // value: '1',
    // direction: 'top',
    defaultValue: 'Выберите значение',
    label: 'list box label',
    items: [
        { value: '1', content: 'Durward Reynolds' },
        { value: '2', content: 'Kenton Towne' },
        { value: '3', content: 'Therese Wunsch', disabled: true },
        { value: '4', content: 'Benedict Kessler' },
        { value: '5', content: 'Katelyn Rohan' },
    ],
};
