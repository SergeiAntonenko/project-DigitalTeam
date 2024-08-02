import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  refreshUser,
  getGoogleUrl,
  verifyGoogleOAuth,
  sendResetEmail,
  resetPassword,
} from './operations';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
    gender: null,
    weight: null,
    activeTime: null,
    dailyWaterGoal: null,
    avatar: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isSend: false,
  error: null,
  url: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  // reducers: {
  //   setToken(state, action) {
  //     state.token = action.payload.token;
  //     state.refreshToken = action.payload.refreshToken;
  //   },
  // },
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
      .addCase(verifyGoogleOAuth.pending, (state, action) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(verifyGoogleOAuth.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(verifyGoogleOAuth.rejected, (state, action) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(sendResetEmail.pending, state => {
        state.isSend = false;
        state.error = null;
        state.successMessage = '';
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.isSend = true;
        state.data = action.payload;
        state.successMessage = 'Email sent successfully!';
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.isSend = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.error.message;
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

// export const setToken = authSlice.actions;
export const authReducer = authSlice.reducer;
