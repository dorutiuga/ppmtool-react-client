import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../models/project-model";
import { Validation } from "../../models/validation";

interface PorjectState {
  project: Project;

  errorMessage: Validation;
}

const initialState: PorjectState = {
  project: {
    projectName: "",
    description: "",
    projectIdentifier: "",
    startDate: "",
    endDate: "",
  },
  errorMessage: {
    projectName: "",
    description: "",
    projectIdentifier: "",
  },
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateFields(state, action: PayloadAction<Project>) {
      state.project = action.payload;
    },
    resetFields(state) {
      state.project = initialState.project;
    },
    fetchProjectByIdentifier(state, action: PayloadAction<Project>) {
      state.project = action.payload;
    },
    getErrors(state, action: PayloadAction<Validation>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  updateFields,
  resetFields,
  getErrors,
  fetchProjectByIdentifier,
} = ProjectSlice.actions;

export default ProjectSlice.reducer;
