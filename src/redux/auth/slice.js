import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser, getGoogleUrl } from './operations';

const INITIAL_STATE = {
  // user: {
  //   name: null,
  //   email: null,
  //   gender: null,
  //   weight: null,
  //   activeTime: null,
  //   dailyWaterGoal: 1.5,
  //   avatar: null,
  // },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  url: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(getGoogleUrl.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getGoogleUrl.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, state => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isLoggedIn = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer;
