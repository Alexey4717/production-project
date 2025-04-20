import { buildSelector } from '@/shared/lib/store';
import { selectLoginState } from '../selectLoginState/selectLoginState';

export const [useLoginPasswordSelector, selectLoginPassword] = buildSelector(
    selectLoginState,
    (loginForm) => loginForm?.password ?? '',
);
