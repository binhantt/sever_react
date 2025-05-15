import { createSlice } from '@reduxjs/toolkit';
import {
  fetchParentCategories,
  createParentCategory,
  updateParentCategory,
  deleteParentCategory
} from '../Api/ParentCategory.Api';

const initialState = {
  data: [],
  loading: false,
  error: null,
  currentCategory: null
};

// Check the reducer is properly updating state
const parentCategorySlice = createSlice({
  name: 'parentCategory',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchParentCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentParentCategory, clearErrors } = parentCategorySlice.actions;
export default parentCategorySlice.reducer;