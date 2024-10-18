export class User {
  name!: string;
  email!: string;
  password!: string;

  constructor(userData: Partial<User>) {
    Object.assign(this, userData);
  }
}
