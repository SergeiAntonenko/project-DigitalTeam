import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

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
