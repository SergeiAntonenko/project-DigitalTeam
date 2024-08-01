import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api.js';
import { toast } from 'react-hot-toast';

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
    return response.data.totalUsers;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (data, thunkAPI) => {
  try {
    const response = await api.instance.patch('users/update', { data });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateAvatar = createAsyncThunk('users/avatar', async ({ file, userId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('id', userId);
    const res = await api.instance.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Avatar updated successfully');
    return res.data;
  } catch (error) {
    const errorMessage = error;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
