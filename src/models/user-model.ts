export interface User {
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface Credential {
  username: string;
  password: string;
}

export interface credentialErr {
  username: string;
  password: string;
}
