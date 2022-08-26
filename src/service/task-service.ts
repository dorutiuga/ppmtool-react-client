import axios from "axios";
import { BASE_API } from "../helpers/strings";
import { Task } from "../models/task.model";

export const createTask = async (backlog_id: string, projectTask: Task) => {
  const res = await axios.post(
    BASE_API.concat(`api/backlog/${backlog_id}`),
    projectTask
  );
  return res.data;
};

export const fetchAllTasks = async (backlog_id: string) => {
  const res = await axios.get(BASE_API.concat(`api/backlog/${backlog_id}`));
  return res.data;
};

export const getProjectTask = async (backlog_id: string, pt_id: string) => {
  const res = await axios.get(
    BASE_API.concat(`api/backlog/${backlog_id}/${pt_id}`)
  );
  return res.data;
};

export const deleteProjectTask = async (backlog_id: string, pt_id: string) => {
  await axios.delete(BASE_API.concat(`api/backlog/${backlog_id}/${pt_id}`));
};
