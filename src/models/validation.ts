export interface Validation {
  projectName: string;
  projectIdentifier: string;
  description: string;
}

export interface AuthValidation {
  username: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}
