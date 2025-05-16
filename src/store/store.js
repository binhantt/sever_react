import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Slice/Login';
import categoriesReducer from './Slice/Category';
import userReducer from './Slice/User.Slice';
import ProducIntroReducer from './Slice/ProductIntro';
import ProducReducter from './Slice/Product';
import orderReducer from './Slice/order';
import parentCategoryReducer from './Slice/ParentCategory.Slice';
import manufacturersReducer from './Slice/Manufacturer';
export const store = configureStore({
  reducer: {
    admin: adminReducer, 
    category: categoriesReducer,
    user: userReducer,
    producintro: ProducIntroReducer, 
    product: ProducReducter,
    order: orderReducer, 
    parentCategory: parentCategoryReducer,
    manufacturers: manufacturersReducer,
  }
});