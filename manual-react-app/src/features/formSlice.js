// src/features/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Generates a random token for each submission
const generateToken = () =>
  "TOK-" + Math.random().toString(36).substring(2, 10).toUpperCase();

const initialState = {
  username: "",
  email: "",
  password: "",
  submittedData: null, // stores submitted snapshot
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Updates individual fields
    setField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    // Saves a snapshot of current fields into submittedData
    submitForm: (state) => {
      state.submittedData = {
        username: state.username,
        email: state.email,
        password: state.password,
        token: generateToken(),
      };
    },

    // Clears form fields but keeps submittedData intact
    resetForm: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { setField, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
