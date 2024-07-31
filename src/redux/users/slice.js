import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersCount, updateUser, updateAvatar, getCurrentUser } from './operations';
import { login, logout } from '../auth/operations';

const initialState = {
  user: {
    name: null,
    email: null,
    _id: null,
    gender: null,
    weight: 0,
    activeTime: 0,
    dailyWaterGoal: 0,
    avatar: null,
  },
  userLoading: false,
  error: false,
  token: null,
  totalUsers: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(getCurrentUser.pending, state => {
        state.userLoading = true;
        state.error = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.userLoading = false;
        state.error = false;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.userLoading = false;
        state.error = false;
      })
      .addCase(fetchUsersCount.pending, state => {
        state.userLoading = true;
        state.error = false;
      })
      .addCase(fetchUsersCount.fulfilled, (state, action) => {
        state.totalUsers = action.payload;
        state.userLoading = false;
        state.error = false;
      })
      .addCase(fetchUsersCount.rejected, state => {
        state.userLoading = false;
        state.error = true;
      })
      .addCase(updateUser.pending, state => {
        state.userLoading = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.userLoading = false;
        state.error = false;
      })
      .addCase(updateUser.rejected, state => {
        state.userLoading = false;
        state.error = true;
      })
      .addCase(updateAvatar.pending, state => {
        state.userLoading = true;
        state.error = false;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
        state.userLoading = false;
        state.error = false;
      })
      .addCase(updateAvatar.rejected, state => {
        state.userLoading = false;
        state.error = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.avatar = null;
        state.totalUsers = null;
        state.userLoading = false;
        state.error = null;
      }),
});

export const usersReducer = usersSlice.reducer;
