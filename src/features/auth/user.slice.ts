import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credential, credentialErr, User } from "../../models/user-model";
import { AuthValidation } from "../../models/validation";

interface StateProps {
  user: User;
  credentialErr: credentialErr;
  errMessage: AuthValidation;
  validToken: boolean;
  credentials: Credential;
}

const initialState: StateProps = {
  user: {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  },
  errMessage: {
    password: "",
    username: "",
    fullName: "",
    confirmPassword: "",
  },
  credentials: {
    username: "",
    password: "",
  },
  validToken: false,
  credentialErr: {
    username: "",
    password: "",
  },
};

const booleanActionPayload = (payload: User) => {
  if (payload.fullName !== "") {
    return true;
  } else {
    return false;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateField(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updateLoginCredentials(state, action: PayloadAction<Credential>) {
      state.credentials = action.payload;
    },
    getAuthErr(state, action: PayloadAction<AuthValidation>) {
      state.errMessage = action.payload;
    },
    getLoginError(state, action: PayloadAction<credentialErr>) {
      state.credentialErr = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User>) {
      state.validToken = booleanActionPayload(action.payload);
      state.user = action.payload;
    },
  },
});

export const {
  updateField,
  getAuthErr,
  getLoginError,
  updateLoginCredentials,
  setCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
