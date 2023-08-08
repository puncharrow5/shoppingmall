import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",

  // payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/register`, body);

      // payload (백엔드에서 전달해준 데이터는 response.data 안에 들어있음)
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",

  // payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/login`, body);

      // payload (백엔드에서 전달해준 데이터는 response.data 안에 들어있음)
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",

  // payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`users/auth`);
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",

  // payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`users/logout`);
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
