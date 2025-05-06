import { createSlice } from '@reduxjs/toolkit';
import { 
  getProductIntros, 
  addProductIntro, 
  updateProductIntro, 
  deleteProductIntro 
} from '../Api/ProductIntro';

const productIntroSlice = createSlice({
  name: 'productIntro',
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
      .addCase(getProductIntros.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductIntros.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getProductIntros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductIntro.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateProductIntro.fulfilled, (state, action) => {
        const index = state.data.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteProductIntro.fulfilled, (state, action) => {
        state.data = state.data.filter(p => p.id !== action.payload);
      });
  }
});

export default productIntroSlice.reducer;