import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}/login`, credentials);
      if (response.data.user?.role !== 'admin') {
        return rejectWithValue({ message: 'Access denied - Admin only' });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);
