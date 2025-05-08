import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk(
  'category/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5, search = '' } = params;
      const response = await axios.get(`${ApiConfig.severAdmin}/categories`, {
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

export const addCategory = createAsyncThunk(
  'category/add',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}/categories/create`, 
        { ...categoryData, image_url: categoryData.image_url || null }
      );
      return response.data.data;
    
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ApiConfig.severAdmin}/categories/update/${id}`, 
        { ...categoryData, image_url: categoryData.image_url || null }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ApiConfig.severAdmin}/categories/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);