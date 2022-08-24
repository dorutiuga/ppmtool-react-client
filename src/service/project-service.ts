import axios from "axios";
import { BASE_API } from "../helpers/strings";
import { Project } from "../models/project-model";

export const createProject = async (project: Project) => {
  await axios.post(BASE_API.concat("api/project"), project);
};

export const getAllProjects = async () => {
  const res = await axios.get(BASE_API.concat("api/project/all"));
  return res.data;
};

export const getProjectByIdentifier = async (identifier: string) => {
  const res = await axios.get(BASE_API.concat(`api/project/${identifier}`));
  return res.data;
};

export const deleteProjectByIdentifier = async (identifier: string) => {
  await axios.delete(BASE_API.concat(`api/project/${identifier}`));
};
