export const getLoginPassword = (state: RootState) =>
    state?.loginForm?.password ?? '';
