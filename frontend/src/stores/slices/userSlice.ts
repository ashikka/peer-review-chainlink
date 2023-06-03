/* eslint-disable react-hooks/rules-of-hooks */
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

export const setUser = createAction<any>(`user/setUser`);

const userSlice = createReducer({
  token: null,
  email: null,
  username: null,
  address: null,
  designation: null,
  scholarUrl: null,
},
  {
    [setUser.toString()]: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.username = action.payload.name;
      state.address = action.payload.address;
      state.designation = action.payload.designation;
      state.scholarUrl = action.payload.scholarUrl;
    }
  });

export default userSlice;