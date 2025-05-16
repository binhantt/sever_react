import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Make sure all actions are created with createAsyncThunk
export const fetchParentCategories = createAsyncThunk(
  'parentCategories/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createParentCategory = createAsyncThunk(
  'parentCategories/create',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}/create`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateParentCategory = createAsyncThunk(
  'parentCategories/update',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ApiConfig.severAdmin}${ApiConfig.parentCategories}/update/${id}`,
        { name }
      );
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
      await axios.delete(`${ApiConfig.severAdmin}${ApiConfig.parentCategories}/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
