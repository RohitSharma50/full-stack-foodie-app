import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

// Get user from localStorage (if exists)
const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

// Define initial state (preloaded state)
const preloadedState = {
  user: {
    currentUser: currentUser,
  },
};

// Create the store
const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
  preloadedState, // <-- correct key name
});
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("currentUser", JSON.stringify(state.user.currentUser));
});

export default store;
