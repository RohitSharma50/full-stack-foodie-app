import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("currentUser");

let parsedUser = null;
try {
  parsedUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
} catch (err) {
  console.error("❌ Invalid user data in localStorage, clearing it...", err);
  localStorage.removeItem("currentUser");
}

const initialState = {
  loading: false,
  currentUser: parsedUser,
  isLoggedIn: !!parsedUser,
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
    userRegisterSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = !!state.currentUser;
      state.error = null;
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
      localStorage.removeItem("authToken");
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
