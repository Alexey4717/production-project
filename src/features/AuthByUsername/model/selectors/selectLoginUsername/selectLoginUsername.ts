import { buildSelector } from '@/shared/lib/store';
import { selectLoginState } from '../selectLoginState/selectLoginState';

export const [useLoginUsernameSelector, selectLoginUsername] = buildSelector(
    selectLoginState,
    (loginForm) => loginForm?.username ?? '',
);
