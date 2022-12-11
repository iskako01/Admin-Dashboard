import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global.slice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
