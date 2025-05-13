import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ApiConfig from '../../config/Api.config';

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page = 1, limit = 10 }) => {
    try {
      const response = await axios.get(`${ApiConfig.severAdmin}/orders`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Create new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}/orders`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Update order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, orderData }) => {
    try {
      const response = await axios.put(`${ApiConfig.severAdmin}/orders/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id) => {
    try {
      await axios.delete(`${ApiConfig.severAdmin}/orders/${id}`);
      return id;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Get order by ID
export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id) => {
    try {
      const response = await axios.get(`${ApiConfig.severAdmin}/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);
