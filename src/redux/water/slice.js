import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  updateWater,
  deleteWater,
  fetchWaterDaily,
  fetchWaterMonthly,
} from './operations';
import { logout } from '../auth/operations';

const initialState = {
  dailyWater: [],
  monthlyWater: [],
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(addWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.dailyWater) {
          state.dailyWater = [];
        }
        state.dailyWater.push(action.payload.waterCount);
        state.error = null;
      })
      .addCase(addWater.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        if (state.dailyWater) {
          state.dailyWater = state.dailyWater.map(water => {
            return water._id === action.payload._id ? action.payload : water;
          });
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateWater.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteWater.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        if (state.dailyWater) {
          state.dailyWater = state.dailyWater.filter(
            water => water._id !== action.payload.waterCount._id
          );
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteWater.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchWaterDaily.pending, state => {
        state.dailyWater = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterDaily.fulfilled, (state, action) => {
        state.dailyWater = action.payload.waterCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWaterDaily.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchWaterMonthly.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterMonthly.fulfilled, (state, action) => {
        state.monthlyWater = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWaterMonthly.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logout.fulfilled, state => {
        state.dailyWater = [];
        state.monthlyWater = [];
        state.error = null;
        state.loading = false;
      }),
});

export const waterReducer = waterSlice.reducer;
