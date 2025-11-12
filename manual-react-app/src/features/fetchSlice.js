// src/features/fetchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching data
export const fetchData = createAsyncThunk("fetchData/getData", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data.slice(0, 5); // Limit for demo
});

const fetchSlice = createSlice({
  name: "fetchData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fetchSlice.reducer;
