export class CreateUserDto {
  name: string;
  email: string;
  passwordHashed: string;

  constructor(name: string, email: string, passwordHashed: string) {
    this.name = name;
    this.email = email;
    this.passwordHashed = passwordHashed;
  }
}
