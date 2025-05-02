import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5, search = '' } = params;
      const response = await axios.get(`${ApiConfig.severAdmin}/users`, {
        params: { page, limit, search }
      });
      return {
        data: response.data.data || [],
        pagination: response.data.pagination || {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: 0,
          totalPages: 1
        }
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}/users/create`, userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ApiConfig.severAdmin}/users/update/${id}`, userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ApiConfig.severAdmin}/users/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);