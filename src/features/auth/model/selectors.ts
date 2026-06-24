import type { RootState } from '@/app/store/store';

export const selectToken = (state: RootState) => state.auth.accessToken;
export  const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null && state.auth.accessToken !== null;