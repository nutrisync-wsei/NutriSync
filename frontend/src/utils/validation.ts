export const VALIDATION = {
  REGEXP: {
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, // one lowercase, one uppercase, one number, 8 characters
  },
};
