
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  email: string;
  password: string;
}

export interface UserState {
  users: User[] 
  currentUser: User | null;
}


const initialState = {
  users: [],
    currentUser: null,
}as UserState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<User>) => {
      state.users.push(action.payload);
     
    },
    clearUser: (state) => {
      state.users = [];
     },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
 