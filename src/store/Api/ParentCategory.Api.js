import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all parent categories
export const fetchParentCategories = createAsyncThunk(
  'parentCategories/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Create new parent category
export const createParentCategory = createAsyncThunk(
  'parentCategories/create',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateParentCategory = createAsyncThunk(
  'parentCategories/update',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}/${id}`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteParentCategory = createAsyncThunk(
  'parentCategories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
