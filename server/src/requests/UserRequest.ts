export interface CreateUserRequest {
  body: {
    username: string;
    email: string;
    password: string;
  };
}
