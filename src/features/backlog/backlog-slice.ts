import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SummaryValidation } from "../../models/task-validation";
import { Task } from "../../models/task.model";

interface StateInterface {
  projectTasks: Task[];
  task: Task;
  errorMessage: SummaryValidation;
}

const initialState: StateInterface = {
  projectTasks: [],
  task: {
    id: 0,
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
    projectSequence: "",
    projectIdentifier: "",
  },
  errorMessage: {
    summary: "",
    projectNotFound: "",
  },
};

const BacklogSlice = createSlice({
  name: "backlog",
  initialState,
  reducers: {
    updateTaskFields(state, action: PayloadAction<Task>) {
      state.task = action.payload;
    },
    resetTaskFields(state) {
      state.task = initialState.task;
    },
    getTaskErrors(state, action: PayloadAction<SummaryValidation>) {
      state.errorMessage = action.payload;
    },
    fetchTasks(state, action: PayloadAction<Task[]>) {
      state.projectTasks = action.payload;
    },
    deleteProjectTaskFromBacklog(state, action: PayloadAction<string>) {
      state.projectTasks = removeTask(state.projectTasks, action.payload);
    },
  },
});

export const {
  updateTaskFields,
  resetTaskFields,
  getTaskErrors,
  fetchTasks,
  deleteProjectTaskFromBacklog,
} = BacklogSlice.actions;

export default BacklogSlice.reducer;

export const removeTask = (tasks: Task[], identifier: string) => {
  return tasks.filter((item) => item.projectSequence !== identifier);
};
