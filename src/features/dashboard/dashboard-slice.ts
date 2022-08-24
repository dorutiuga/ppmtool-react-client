import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../models/project-model";

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchAllProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    updateProjects(state, action: PayloadAction<string>) {
      state.projects = removeProject(state.projects, action.payload);
    },
  },
});

export const { fetchAllProjects, updateProjects } = DashboardSlice.actions;
export default DashboardSlice.reducer;

const removeProject = (projects: Project[], identifier: string) => {
  return projects.filter((project) => project.projectIdentifier !== identifier);
};
