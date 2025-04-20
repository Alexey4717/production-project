import { buildSelector } from '@/shared/lib/store';

export const [useLoginStateSelector, selectLoginState] = buildSelector(
    (state) => state?.loginForm,
);
