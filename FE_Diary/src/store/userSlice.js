import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickname: "",
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.nickname = action.payload;
      state.isLogin = true;
    },
    setLogout(state) {
      state.nickname = "";
      state.isLogin = false;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
