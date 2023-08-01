import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 서로 다른 리듀싱 함수들을 값으로 가지는 객체들을 combinReducers를 사용하여 하나의 리듀싱 함수로 합쳐줌
const rootReducer = combineReducers({
  user: userReducer,
});

// Reduce store 안에 있는 데이터를 저장할 곳을 지정(로컬 or 세션스토리지)
const persistConfig = {
  key: "root",
  storage, // reduce store안에 있는 데이터들을 로컬스토리지에 저장
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
