import {  createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState:{
  user:null,
},
  reducers: {
    login: (state,action) => {
      state.user   = action.payload;
    },
    logout: (state) => {
      state.user =null;
      persistor.purge();
    }
  },
 
});

export const { login,logout } = userSlice.actions;

// selector 
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;