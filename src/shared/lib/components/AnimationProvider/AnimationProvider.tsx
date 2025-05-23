import {
    type ReactNode,
    createContext,
    use,
    useEffect,
    useRef,
    useState,
} from 'react';

// На размер бандла не повлияет, т.к. типы в бандл не уходят
type SpringType = typeof import('@react-spring/web'); // типовое представление всего содержимого модуля
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга
const getAsyncAnimationModules = async () => {
    // параллельная подгрузка
    return Promise.all([
        // Динамические импорты, которые позволяют загружать модули асинхронно и динамически во время выполнения.
        // Их можно использовать хоть где (внутри компонентов, функций ...). Возвращают Promise.
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};

export const useAnimationLibs = () => {
    // TODO добавить проверку что находимся внутри AnimationProvider с выбросом ошибки
    return use(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>(undefined);
    const GestureRef = useRef<GestureType>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    }, []);

    const value = {
        Gesture: GestureRef.current,
        Spring: SpringRef.current,
        isLoaded,
    };

    return <AnimationContext value={value}>{children}</AnimationContext>;
};
