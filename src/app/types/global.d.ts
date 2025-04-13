declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';

    const SVG: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
    export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

declare type RootState =
    import('../providers/StoreProvider/config/StateSchema').StateSchema;

declare type AppDispatch = ReturnType<
    typeof import('../providers/StoreProvider/config/store').createReduxStore
>['dispatch'];

declare type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

declare type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
