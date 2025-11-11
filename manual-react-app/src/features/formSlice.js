import { createSlice } from "@reduxjs/toolkit";

// Function to generate a random reusable token
const generateToken = () => {
  return "TOK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const initialState = {
  username: "",
  email: "",
  password: "",
  submittedData: null,
  token: null, // added token state
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
      // If token already exists, reuse it; otherwise, generate new one
      if (!state.token) {
        state.token = generateToken();
      }

      state.submittedData = {
        username: state.username,
        email: state.email,
        password: state.password,
        token: state.token,
      };
    },

    resetForm: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.submittedData = null;
      state.token = null; // reset token
    },
  },
});

export const { setField, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
