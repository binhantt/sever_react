import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin } from '../Api/Login';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    user: null,
    loading: false,
    error: null,
    role: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.data.user;
      
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
        state.user = null;
        state.role = null;
        localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;
export default adminSlice.reducer;