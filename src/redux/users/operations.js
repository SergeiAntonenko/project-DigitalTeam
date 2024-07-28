import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';

export const getCurrentUser = createAsyncThunk('users/current', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  try {
    const res = await api.instance.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUsersCount = createAsyncThunk('users/fetchUsersCount', async (_, thunkAPI) => {
  try {
    const response = await api.instance.get('users/count');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (_, thunkAPI) => {
  try {
    const response = await api.instance.patch('users/update');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateAvatar = createAsyncThunk('users/updateAvatar', async (_, thunkAPI) => {
  try {
    const response = await api.instance.patch('users/avatar');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
