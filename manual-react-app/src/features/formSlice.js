// src/features/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const generateToken = () =>
  "TOK-" + Math.random().toString(36).substring(2, 10).toUpperCase();

const initialState = {
  username: "",
  email: "",
  password: "",
  submittedData: null, // <-- store submitted snapshot here
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    submitForm: (state) => {
      // snapshot current fields to submittedData
      state.submittedData = {
        username: state.username,
        email: state.email,
        password: state.password,
        token: generateToken(),
      };
    },
    resetForm: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      // DO NOT clear submittedData here
    },
  },
});

export const { setField, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
