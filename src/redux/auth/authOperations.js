import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

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
