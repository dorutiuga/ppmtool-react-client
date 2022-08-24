import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectReducer from "../features/project/project-slice";
import dashboardReducer from "../features/dashboard/dashboard-slice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    dashboard: dashboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
