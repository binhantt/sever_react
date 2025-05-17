import { createSlice } from '@reduxjs/toolkit';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../Api/Category';

const categorySlice = createSlice({
  name: 'category',
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
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        console.log('getCategories.pending');
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
        console.log('getCategories.fulfilled - Payload:', action.payload);
        console.log('getCategories.fulfilled - State data:', state.data);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('getCategories.rejected - Error:', action.payload);
      })
      // Xử lý addCategory
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Xử lý updateCategory
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      // Xử lý deleteCategory
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(c => c.id !== action.payload);
      });
  }
});

export default categorySlice.reducer;