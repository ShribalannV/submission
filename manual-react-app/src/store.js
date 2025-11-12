// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice.js";
import fetchReducer from "./features/fetchSlice.js";

const store = configureStore({
  reducer: {
    form: formReducer,
    fetch: fetchReducer,
  },
});

export default store;
