import { configureStore } from "@reduxjs/toolkit";
import userDataReducers from "./userDataSlice";
const store = configureStore({
  reducer: { userData: userDataReducers },
});

export default store;
