import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 기본 로컬스토리지 사용
import userReducer from "./userSlice";

// persist 설정
const persistConfig = {
  key: "root", // 상태를 저장할 기본 키
  storage, // 저장소를 지정 (기본적으로 로컬스토리지)
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
