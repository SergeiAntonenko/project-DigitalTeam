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
  monthlyWater: null,
  totalDay: null,
  totalForAllDays: {},
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
        state.totalDay = state.totalDay + action.payload.waterCount.waterValue;
        state.monthlyWater = state.monthlyWater + action.payload.waterCount.waterValue;
        state.loading = false;

        const { waterCount } = action.payload;
        const waterDate = waterCount.localDate;

        if (state.totalForAllDays[waterDate] !== undefined) {
          state.totalForAllDays[waterDate] += waterCount.waterValue;
        }

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
        const { waterCount } = action.payload;
        const waterDate = waterCount.localDate;

        if (state.totalForAllDays[waterDate] !== undefined) {
          state.totalForAllDays[waterDate] -= waterCount.waterValue;

          if (state.totalForAllDays[waterDate] <= 0) {
            delete state.totalForAllDays[waterDate];
          }
        }

        if (state.dailyWater) {
          state.dailyWater = state.dailyWater.filter(
            water => water._id !== action.payload.waterCount._id
          );
        }
        state.totalDay = state.totalDay - action.payload.waterCount.waterValue;
        state.monthlyWater = state.monthlyWater - action.payload.waterCount.waterValue;

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
        state.totalDay = action.payload.totalDay;
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
        state.monthlyWater = action.payload.totalMonth;
        state.totalForAllDays = action.payload.dailyTotals;
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
