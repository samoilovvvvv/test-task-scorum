import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: localStorage.getItem('isAuth') === 'true'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuth = true;
    },
    signOut: (state) => {
      state.isAuth = false;
    }
  }
});