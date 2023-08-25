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

export const addToCart = createAsyncThunk(
  "user/addToCart",

  // payload creator
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/users/cart`, body);
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "user/getCartItems",

  // payload creator 이부분 다시 공부!
  async ({ cartItemIds, userCart }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/products/${cartItemIds}?type=array`
      );
      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        });
      });
      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",

  // payload creator
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `users/cart?productId=${productId}`
      );

      response.data.cart.forEach((cartItem) => {
        response.data.productInfo.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data.prodcutInfo[index].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    } catch (error) {
      console.log(error);

      // 에러발생시 payload가 됨
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
