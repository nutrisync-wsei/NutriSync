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

export type AuthUser = {
  authorized?: boolean;
  id?: string;
  email?: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
};
