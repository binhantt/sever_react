import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Slice/Login';
import counterReducer from './counterSlice';
import categoriesReducer from './Slice/Category'; // Import the categories reducer from Category.js or another file where it's defined.
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    admin: adminReducer, 
    category: categoriesReducer // Changed from categories to category
  },
});