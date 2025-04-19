import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/consts/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
