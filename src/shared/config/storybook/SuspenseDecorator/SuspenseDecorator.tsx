import { Suspense } from 'react';
import { type ComponentType } from 'react';

export const SuspenseDecorator = (StoryComponent: ComponentType) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
