import { createSlice } from "@reduxjs/toolkit";
import { getGames } from "./gamesOperations";

const initialState = {
  games: [],
  gamesListLength: null,
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

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, handlePending)
      .addCase(getGames.fulfilled, (state, { payload }) => {
        state.games = payload.games;
        state.gamesListLength = payload.gamesListLength;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getGames.rejected, handleRejected);
  },
});

export const gamesReducer = gamesSlice.reducer;
