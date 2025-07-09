import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("currentUser");

// Initialize state with potential existing user from localStorage
const initialState = {
  loading: false,
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  isLoggedIn: storedUser ? true : false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Registration actions
    userRegisterRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
    },
    userRegisterFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login actions
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true; // Assuming you want to track login state
      state.currentUser = action.payload;
      state.error = null;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    userLoginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout/clear actions (consolidated)
    userLogout: (state) => {
      state.loading = false;
      state.isLoggedIn = false; // Reset login state
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailed,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
  userLogout,
} = userSlice.actions;

export default userSlice.reducer;
