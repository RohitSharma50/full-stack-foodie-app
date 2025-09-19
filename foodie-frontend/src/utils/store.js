import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

//  Safe parse for localStorage
let currentUser = null;
try {
  const stored = localStorage.getItem("currentUser");
  if (stored && stored !== "undefined") {
    currentUser = JSON.parse(stored);
  }
} catch (err) {
  console.error("❌ Invalid user data in localStorage, clearing it...", err);
  localStorage.removeItem("currentUser");
}

//  initial state
const preloadedState = {
  user: {
    currentUser: currentUser,
    loading: false,
    isLoggedIn: !!currentUser,
    error: null,
  },
};

// Create the store
const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
  preloadedState,
});

//  Keep localStorage in sync
store.subscribe(() => {
  const state = store.getState();
  if (state.user.currentUser) {
    localStorage.setItem("currentUser", JSON.stringify(state.user.currentUser));
  } else {
    localStorage.removeItem("currentUser"); //  avoid saving "undefined"
  }
});

export default store;
