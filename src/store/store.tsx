import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
import authReducer from './authSlice';
import { userSliceReducer } from './userSlice';
import bookReducer from './bookSlice';
const store = configureStore({
  reducer: {
    // user: userReducer,
    auth: authReducer,
    userSlice:userSliceReducer,
    books:bookReducer,
  },
});

export default store;
