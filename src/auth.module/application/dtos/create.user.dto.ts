export class CreateUserDto {
  name!: string;
  email!: string;
  passwordHashed!: string;

  constructor(userData: Partial<CreateUserDto>) {
    Object.assign(this, userData);
  }
}
