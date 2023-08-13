import { configureStore } from '@reduxjs/toolkit';
 import bookDetailsReducer from './bookDetails';
import userSlice from './userSlice';
const store = configureStore({
  reducer: {
    userSlice:userSlice,
    bookDetails : bookDetailsReducer,
 
  },
});

export default store ;
