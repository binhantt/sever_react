import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addProduct = createAsyncThunk(
  'product/add',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ApiConfig.severAdmin}/products/create`,
        productData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ApiConfig.severAdmin}/products/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async (payload, { rejectWithValue }) => {
    try {
      const { id, productData } = payload;
      console.log(productData);
      const response = await axios.put(
        `${ApiConfig.severAdmin}/products/update/${id}`,
        productData
      );
      return { id, data: response.data.data }; // Return both id and updated data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getProducts = createAsyncThunk(
  'product/getAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5, search = '' } = params;
      const response = await axios.get(`${ApiConfig.severAdmin}/products`, {
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