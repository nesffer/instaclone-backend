export default interface User {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
