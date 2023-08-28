import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
  addToCart,
  getCartItems,
  removeCartItem,
  payProducts,
} from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    emai: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "실패",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 가입 보류 중
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      // 가입 성공
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("회원가입이 완료되었습니다.");
      })
      // 가입 실패
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // 로그인 보류 중
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      // 로그인 성공
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      // 로그인 실패
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // 로그아웃 시 userSlice의 initialState의 초기 userData로 초기화시켜줌
        state.userData = initialState.userData;
        state.isAuth = false;
        // 토큰 삭제시켜줌
        localStorage.removeItem("accessToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })

      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.cart = action.payload;
        toast.info("장바구니에 상품이 추가되었습니다.");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload.productInfo;
        state.userData.cart = action.payload.cart;
        toast.info("장바구니에서 삭제되었습니다.");
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(payProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(payProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // 결제 완료 후 cart 비워줌
        state.cartDetail = [];
        state.userData.cart = [];
        toast.info("상품 구매가 완료되었습니다!");
      })
      .addCase(payProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;
