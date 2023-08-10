import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, password } = action.payload;
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
      state.email = email;
      state.password = password;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;

export type RootState = {
  userSlice: UserState;
};