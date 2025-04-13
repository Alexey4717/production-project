import { useState } from 'react';

interface UseHoverBind {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverBind];

export const useHover = (): UseHoverResult => {
    const [isHovered, setHovered] = useState(false);

    const onMouseEnter = () => {
        setHovered(true);
    };

    const onMouseLeave = () => {
        setHovered(false);
    };

    return [
        isHovered,
        {
            onMouseEnter,
            onMouseLeave,
        },
    ];
};
