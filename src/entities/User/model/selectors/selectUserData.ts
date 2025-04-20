import { buildSelector } from '@/shared/lib/store';

export const [useUserAuthDataSelector, selectUserAuthData] = buildSelector(
    (state) => state.user.authData,
);

export const [useUserInitedSelector, selectUserInited] = buildSelector(
    (state) => state.user._inited,
);
