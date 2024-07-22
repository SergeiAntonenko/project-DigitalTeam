import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersCount, updateUser, updateAvatar } from './operations';
import { login, logout } from '../auth/operations';

const initialState = {
  user: null,
  avatar: null,
  totalCount: 1,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchUsersCount.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsersCount.fulfilled, (state, action) => {
        state.totalCount = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchUsersCount.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(updateUser.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateAvatar.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(updateAvatar.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.avatar = null;
        state.totalCount = 1;
        state.loading = false;
        state.error = null;
      }),
});

// export const { fetchingInProgress, fetchingSuccess, fetchingError } = waterSlice.actions;

export default usersSlice.reducer;
