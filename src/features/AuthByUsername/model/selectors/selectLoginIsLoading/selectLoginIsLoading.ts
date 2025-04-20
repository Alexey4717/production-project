import { buildSelector } from '@/shared/lib/store';
import { selectLoginState } from '../selectLoginState/selectLoginState';

export const [useLoginIsLoadingSelector, selectLoginIsLoading] = buildSelector(
    selectLoginState,
    (loginForm) => loginForm?.isLoading ?? false,
);
