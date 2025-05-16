import { createSlice } from '@reduxjs/toolkit';
import {
  fetchParentCategories,
  createParentCategory,
  updateParentCategory,
  deleteParentCategory
} from '../Api/ParentCategory.Api';

const parentCategorySlice = createSlice({
  name: 'parentCategory',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle all action types properly
    builder
      .addCase(fetchParentCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchParentCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
    
    // Add similar handlers for other CRUD operations
  }
});

export default parentCategorySlice.reducer;