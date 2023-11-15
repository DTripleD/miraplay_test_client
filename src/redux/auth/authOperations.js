import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://miraplay-test-server-xzvo.onrender.com/users/signup",
        credentials
      );

      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://miraplay-test-server-xzvo.onrender.com/users/signin",
        credentials
      );

      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  console.log(state.auth.token);

  setAuthHeader(state.auth.token);

  try {
    await axios.post(
      "https://miraplay-test-server-xzvo.onrender.com/users/logout"
    );
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
