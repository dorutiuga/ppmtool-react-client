import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectReducer from "../features/project/project-slice";
import dashboardReducer from "../features/dashboard/dashboard-slice";
import backlogReducer from "../features/backlog/backlog-slice";
import userReducer from "../features/auth/user.slice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    dashboard: dashboardReducer,
    backlog: backlogReducer,
    user: userReducer,
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
