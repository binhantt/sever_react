import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, createUser, updateUser, deleteUser } from '../Api/User.Api';

const initialState = {
  users: [], // Ensure this is always an array
  loading: false,
  error: null,
  currentUser: null,
  operationLoading: false,
  operationError: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
      state.operationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || []; // Extract just the data array
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Create User
      .addCase(createUser.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.error.message;
      })
      
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.operationLoading = false;
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.error.message;
      })
      
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.users = state.users.filter(u => u.id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.error.message;
      });
  }
});

export const { setCurrentUser, clearErrors } = userSlice.actions;
export default userSlice.reducer;