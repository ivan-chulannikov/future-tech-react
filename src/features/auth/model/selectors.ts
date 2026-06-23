import type { RootState } from '@/app/store/store';

export const selectToken = (state: RootState) => state.auth.accessToken;
