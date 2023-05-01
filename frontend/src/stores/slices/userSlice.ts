/* eslint-disable react-hooks/rules-of-hooks */
import { createAction, createSlice } from '@reduxjs/toolkit';

export const setUser = createAction<any>(`user/setUser`);

const userSlice = createSlice({
  name: 'user',

  initialState: {
    token: null,
    email: null,
    username: null
  },
  reducers: {
    [setUser.toString()]: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.username = action.payload.username;
    }
  },

});

export default userSlice.reducer;