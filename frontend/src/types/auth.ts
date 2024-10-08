export type Credentials = {
  email: string;
  password: string;
};

export type User = Pick<Credentials, 'email'> & {
  id: string;
  name: string;
  role: string;
};

export type LoginFormValues = Pick<Credentials, 'email' | 'password'>;
export type SignupFormValues = Pick<Credentials, 'email' | 'password'> &
  Pick<User, 'name'>;
