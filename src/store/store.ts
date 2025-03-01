import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { formsReducer } from './slices/forms';

const rootReducer = combineReducers({
  forms: formsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
