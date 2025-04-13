import { type ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: string;
    onTabClick: (tab: TabItem<T>) => void;
    direction?: FlexDirection;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, tabs, onTabClick, value, direction = 'row' } = props;

    const clickHandle = (tab: TabItem<T>) => () => {
        onTabClick(tab);
    };

    return (
        <Flex
            direction={direction}
            gap="8"
            align="start"
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(cls.tab, {
                            [cls.selected]: isSelected,
                        })}
                        key={tab.value}
                        onClick={clickHandle(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
};
