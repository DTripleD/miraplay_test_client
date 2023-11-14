import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGames = createAsyncThunk(
  "games/getGames",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://api.miraplay.cloud/games/by_page",
        credentials
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
