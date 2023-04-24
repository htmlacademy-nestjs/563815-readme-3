export type DatabaseUser = {
  name: string;
  email: string;
  passwordHash: string;
};

export type UserFromClient = {
  // Registration and login
  email: string;
  password: string;

  // Registration only
  name: string;
  passwordConfirmation?: string;
};

export type UserToClient = {
  name: string;
  email: string;
};

export type NewPasswordFromClient = {
  id: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};
