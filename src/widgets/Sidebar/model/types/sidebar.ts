import type { SVGProps, JSX } from 'react';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    authOnly?: boolean;
}
