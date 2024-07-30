import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const addWater = createAsyncThunk(
  'water/add',
  async ({ waterValue: waterAmount, localDate, localTime }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await api.instance.post(
        '/water/add',
        {
          waterValue: waterAmount,
          localDate,
          localTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  const state = thunkAPI.getState();
  const token = state.auth.token;
  try {
    const response = await api.instance.delete(`water/${recordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchWaterDaily = createAsyncThunk('water/daily', async (date, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  try {
    const response = await api.instance.get('water/daily', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        date: date,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchWaterMonthly = createAsyncThunk(
  'water/fetchWaterMonthly',
  async (month, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const response = await api.instance.get('water/monthly', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          month,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
