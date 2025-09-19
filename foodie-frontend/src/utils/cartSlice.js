import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
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
