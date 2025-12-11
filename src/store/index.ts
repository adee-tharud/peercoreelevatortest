import { configureStore } from "@reduxjs/toolkit";
import elevatorReducer from "./slices/elevatorSlice";

export const store = configureStore({
  reducer: {
    elevator: elevatorReducer,
  },
  devTools: import.meta.env?.DEV ?? true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;