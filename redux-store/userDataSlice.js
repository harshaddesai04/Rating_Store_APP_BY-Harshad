import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {} };

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    saveUserData(state, action) {
      console.log(action.payload.email);
      state.user = { ...action.payload };
    },
  },
});

export const userDataActions = userSlice.actions;
export default userSlice.reducer;
