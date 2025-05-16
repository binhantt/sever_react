import { createSlice } from '@reduxjs/toolkit';
import { fetchManufacturers, createManufacturer, updateManufacturer, deleteManufacturer } from '../Api/manufacturers';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const manufacturersSlice = createSlice({
  name: 'manufacturers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder
      // Handle all fulfilled states FIRST
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.data)) {
          state.data = [];
        }
        state.data = [...state.data, action.payload]; // Create new array reference
        return state;
      })
      .addCase(updateManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.data)) {
          const index = state.data.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        } else {
          state.data = [action.payload];
        }
      })
      .addCase(deleteManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter(item => item.id !== action.payload);
        } else {
          state.data = [];
        }
        return state; // Explicitly return the updated state
      })
      
      // Then handle pending states with matcher
      .addMatcher(
        (action) => [
          fetchManufacturers.pending,
          createManufacturer.pending,
          updateManufacturer.pending,
          deleteManufacturer.pending
        ].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      
      // Finally handle rejected states with matcher
      .addMatcher(
        (action) => [
          fetchManufacturers.rejected,
          createManufacturer.rejected,
          updateManufacturer.rejected,
          deleteManufacturer.rejected
        ].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  }
});

export default manufacturersSlice.reducer;