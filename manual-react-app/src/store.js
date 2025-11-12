// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice.js";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
