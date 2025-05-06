import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Slice/Login';
import counterReducer from './counterSlice';
import categoriesReducer from './Slice/Category';
import userReducer from './Slice/User.Slice'; // Thêm import reducer cho user
import ProducIntroReducer from './Slice/ProductIntro';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    admin: adminReducer, 
    category: categoriesReducer,
    user: userReducer, // Thêm user reducer vào store
    producintro : ProducIntroReducer
  },
});