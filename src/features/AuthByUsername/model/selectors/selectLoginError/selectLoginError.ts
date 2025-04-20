import { buildSelector } from '@/shared/lib/store';
import { selectLoginState } from '../selectLoginState/selectLoginState';

export const [useLoginErrorSelector, selectLoginError] = buildSelector(
    selectLoginState,
    (loginForm) => loginForm?.error,
);
