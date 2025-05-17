import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, updateProduct, getProducts } from '../Api/Product';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 1
    }
  },
  extraReducers: (builder) => {
    builder
      // Xử lý getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];

        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Xử lý updateProduct
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.data.findIndex(p => p.id === id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...data };
        }
      })
      // Xử lý deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(p => p.id !== action.payload);
      });
  }
});

export default productSlice.reducer;