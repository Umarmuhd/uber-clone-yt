import { configureStore, createSlice } from "@reduxjs/toolkit";

import navReducer from "./slices/navSlice";

const store = configureStore({
  reducer: { nav: navReducer },
});

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));

export default store;
