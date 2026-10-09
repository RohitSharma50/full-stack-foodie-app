import { createSlice } from "@reduxjs/toolkit";

const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem("foodieCart");
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];

    if (
      Array.isArray(parsedItems) &&
      parsedItems.every(
        (item) =>
          item &&
          typeof item === "object" &&
          item.id != null &&
          Number.isFinite(item.count) &&
          item.count > 0,
      )
    ) {
      return parsedItems;
    }

    console.error("Invalid cart data in localStorage; clearing it.");
  } catch (error) {
    console.error("Unable to read cart data from localStorage:", error);
  }

  localStorage.removeItem("foodieCart");
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartItems(),
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    incrementItemCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.count += 1;
    },
    decrementItemCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      } else if (item && item.count === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItemCount,
  decrementItemCount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
