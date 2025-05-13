import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Slice/Login';
import categoriesReducer from './Slice/Category';
import userReducer from './Slice/User.Slice'; // Thêm import reducer cho user
import ProducIntroReducer from './Slice/ProductIntro';
import ProducReducter from './Slice/Product';
import orderReducer from './Slice/order'; // Thêm import order reducer

export const store = configureStore({
  reducer: {
    admin: adminReducer, 
    category: categoriesReducer,
    user: userReducer, // Thêm user reducer vào store
    producintro : ProducIntroReducer , 
    product : ProducReducter,
    order: orderReducer // Thêm order reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});