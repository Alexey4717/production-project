import type { RouteProps } from 'react-router-dom';
// TODO вернуться позже
// eslint-disable-next-line alexey4717-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}
