import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./reducer/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
