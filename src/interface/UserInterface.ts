export interface UserAttributes {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: "admin" | "user";
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
