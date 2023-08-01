import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",

  // payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/registers`, body);

      // payload
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
