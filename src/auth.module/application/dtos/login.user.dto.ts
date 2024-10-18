export class LoginUserDto {
  email!: string;
  password!: string;

  constructor(userData: Partial<LoginUserDto>) {
    Object.assign(this, userData);
  }
}
