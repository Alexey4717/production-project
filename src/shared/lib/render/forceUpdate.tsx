import { createContext, type ReactNode, use, useState } from 'react';

const ForceUpdateContext = createContext({
    value: true,
    forceUpdate: () => {},
});

export const useForceUpdate = () => {
    const { forceUpdate } = use(ForceUpdateContext);

    return forceUpdate;
};

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState(true);

    const forceUpdate = () => {
        setValue((prev) => !prev);
        setTimeout(() => {
            setValue((prev) => !prev);
        }, 120);
    };

    const valueContext = { value, forceUpdate };

    if (!value) {
        return null;
    }

    return (
        <ForceUpdateContext value={valueContext}>{children}</ForceUpdateContext>
    );
}
