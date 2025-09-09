import { configureStore } from '@reduxjs/toolkit';
import userCreationReducer from './userCreation.slice';
import authReducer from './auth.slice';
import productReducer from './product.slice';

export const store = configureStore({
    reducer: {
        userCreation: userCreationReducer,
        auth: authReducer,
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
