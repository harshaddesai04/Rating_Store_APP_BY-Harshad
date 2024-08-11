import { createSlice } from "@reduxjs/toolkit";
export let role = "";
const initialState = { user: {} };
try {
  const userdetails = localStorage.setItem("user");
  initialState.user(JSON.parse(userdetails));
} catch {}
const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    saveUserData(state, action) {
      state.user = { ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
      document.cookie = `userData=${JSON.stringify(action.payload)}`;
    },
    logout(state) {
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

export const userDataActions = userSlice.actions;
export default userSlice.reducer;
