import { type ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: string;
    onTabClick: (tab: TabItem<T>) => void;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, tabs, value, onTabClick } = props;

    const clickHandle = (tab: TabItem<T>) => () => {
        onTabClick(tab);
    };

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab}
                    onClick={clickHandle(tab)}
                    theme={
                        tab.value === value
                            ? CardTheme.NORMAL
                            : CardTheme.OUTLINED
                    }
                    key={tab.value}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
