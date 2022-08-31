import axios from "axios";

import { BASE_API } from "../helpers/strings";
import { Credential, User } from "../models/user-model";

export const register = async (newUser: User) => {
  const res = await axios.post(BASE_API.concat("api/users/register"), newUser);
  return res.data;
};

export const login = async (LoginRequest: Credential) => {
  const res = await axios.post(
    BASE_API.concat("api/users/login"),
    LoginRequest
  );
  return res.data;
};
