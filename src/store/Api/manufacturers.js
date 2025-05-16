import axios from 'axios';
import ApiConfig from '../../config/Api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchManufacturers = createAsyncThunk(
  'manufacturers/fetchAll',
  async () => {
    const response = await axios.get(`${ApiConfig.severAdmin}${ApiConfig.manufacturers}`);
    return response.data;
  }
);

export const createManufacturer = createAsyncThunk(
  'manufacturers/create',
  async (data) => {
    const response = await axios.post(`${ApiConfig.severAdmin}${ApiConfig.manufacturers}/create`, data);
    return response.data;
  }
);

export const updateManufacturer = createAsyncThunk(
  'manufacturers/update',
  async ({id, ...data}) => {
    const response = await axios.put(`${ApiConfig.severAdmin}${ApiConfig.manufacturers}/update/${id}`, data);
    return response.data;
  }
);

export const deleteManufacturer = createAsyncThunk(
  'manufacturers/delete',
  async (id) => {
    await axios.delete(`${ApiConfig.severAdmin}${ApiConfig.manufacturers}/delete/${id}`);
    return id;
  }
);