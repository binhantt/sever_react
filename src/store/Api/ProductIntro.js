import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProductIntros = createAsyncThunk(
  'productIntro/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5 } = params;
      const response = await axios.get(`${ApiConfig.severAdmin}/product-intros`, {
        params: { page, limit }
      });
      return {
        data: response.data.data.items || [],
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

export const addProductIntro = createAsyncThunk(
  'productIntro/add',
  async (productIntroData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ApiConfig.severAdmin}/product-intros/create`,
        productIntroData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductIntro = createAsyncThunk(
  'productIntro/update',
  async ({ id, productIntroData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${ApiConfig.severAdmin}/product-intros/update/${id}`,
        productIntroData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductIntro = createAsyncThunk(
  'productIntro/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ApiConfig.severAdmin}/product-intros/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);