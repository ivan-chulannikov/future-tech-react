import { configureStore } from '@reduxjs/toolkit';
import { baseApi} from '@/shared/api/baseApi';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/es/storage';

import { savedPostsReducer } from '@/features/save-post';
import { authReducer } from '@/features/auth/model/authSlice';

const savedPostsPersistConfig = {
    key: 'savedPosts',
    storage,
};

const persistedSavedPostsReducer = persistReducer(savedPostsPersistConfig, savedPostsReducer);

export const store = configureStore({
    reducer: {
        savedPosts: persistedSavedPostsReducer,
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(baseApi.middleware),
            
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
