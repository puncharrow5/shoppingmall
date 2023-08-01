import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunkFunctions";
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
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "실패";
        toast.error("회원가입 실패");
      });
  },
});

export default userSlice.reducer;
