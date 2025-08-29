import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/signup", { name, email, password });
      return res.data;
    } catch (error) {
      return rejectWithValue({
        status: error.reducer?.status,
        message: error.respone?.data?.message || "Signup failed",
      });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
