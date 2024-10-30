export class User {
  id!: string;
  name!: string;
  email!: string;
  password?: string;
  role?:string;
  token?:string;
  createdAt?:Date;
  updatedAt?:Date;

  constructor(userData: Partial<User>) {
    Object.assign(this, userData);
  }
}
