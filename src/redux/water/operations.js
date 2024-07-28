import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const addWater = createAsyncThunk(
  'water/add',
  async ({ waterValue: waterAmount, localDate, localTime }, thunkAPI) => {
    try {
      const response = await api.instance.post('/water/add', {
        waterValue: waterAmount,
        localDate,
        localTime,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async (recordId, water, thunkAPI) => {
    try {
      const response = await api.instance.patch(`water/${recordId}`, water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk('water/deleteWater', async (recordId, thunkAPI) => {
  try {
    const response = await api.instance.delete(`water/${recordId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchWaterDaily = createAsyncThunk('water/fetchWaterDaily', async (_, thunkAPI) => {
  try {
    const response = await api.instance.get('water/daily');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchWaterMonthly = createAsyncThunk(
  'water/fetchWaterMonthly',
  async (_, thunkAPI) => {
    try {
      const response = await api.instance.get('water/monthly');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
