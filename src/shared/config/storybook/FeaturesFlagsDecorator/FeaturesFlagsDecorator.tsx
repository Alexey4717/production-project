import { ComponentType } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeaturesFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: ComponentType) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
