import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await api.instance.post('/users/register', credentials);

    api.setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await api.instance.post('/users/login', credentials);

    api.setAuthHeader(res.data.data.accessToken);

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.instance.post('users/logout');
    api.clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh-token', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    api.setAuthHeader(persistedToken);
    const res = await api.instance.post('users/refresh-token');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getGoogleUrl = createAsyncThunk('auth/get-oauth-url', async (_, thunkAPI) => {
  try {
    const res = await api.instance.get('/users/get-oauth-url');
    return res.data.url;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const verifyGoogleOAuth = createAsyncThunk('auth/confirm-oauth', async (code, thunkAPI) => {
  try {
    const res = await api.instance.post('/users/confirm-oauth', { code });

    api.setAuthHeader(res.data.data.accessToken);

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
