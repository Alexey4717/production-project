import { type ComponentType } from 'react';
// Это исключение, не бизнес код, а хелпер для тестов
// eslint-disable-next-line alexey4717-plugin/layer-imports
import '@/app/styles/index.scss';

export const StyleDecorator = (StoryComponent: ComponentType) => (
    <StoryComponent />
);
