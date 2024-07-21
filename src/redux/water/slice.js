import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  updateWater,
  deleteWater,
  fetchWaterDaily,
  fetchWaterMonthly,
} from './operations';
import { logOut } from '../auth/operations';

const initialState = {
  dailyWater: null,
  monthlyWater: null,
  loading: false,
  error: null,
};

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(addWater.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        // state.items = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(addWater.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateWater.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        // state.items.push(action.payload);
        state.loading = false;
        state.error = false;
      })
      .addCase(updateWater.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteWater.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        // state.items = state.items.filter(item => item.id !== action.payload.id);
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteWater.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchWaterDaily.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchWaterDaily.fulfilled, (state, action) => {
        state.dailyWater = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchWaterDaily.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchWaterMonthly.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchWaterMonthly.fulfilled, (state, action) => {
        state.monthlyWater = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchWaterMonthly.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.dailyWater = null;
        state.monthlyWater = null;
        state.error = null;
        state.isLoading = false;
      }),
});

// export const { fetchingInProgress, fetchingSuccess, fetchingError } = waterSlice.actions;

export default waterSlice.reducer;
