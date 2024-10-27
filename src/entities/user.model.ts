export class User {
  id!: string;
  name!: string;
  email!: string;
  password?: string;
  token?:string;

  constructor(userData: Partial<User>) {
    Object.assign(this, userData);
  }
}
