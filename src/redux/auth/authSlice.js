import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authOperations";

const initialState = {
  user: { name: null, email: null, id: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.refreshToken = payload.refreshToken;
        state.user = payload.userData;
        state.token = payload.accessToken;
        state.sid = payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
