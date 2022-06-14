import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reducers/authReducer';
import { gameSlice } from './reducers/gameReducer';

const rootReducer = {
  authReducer: authSlice.reducer,
  gameReducer: gameSlice.reducer
};

export const store = configureStore({
  reducer: rootReducer
});