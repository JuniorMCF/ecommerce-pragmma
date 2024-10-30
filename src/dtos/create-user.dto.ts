export class CreateUserDto {
  name: string;
  email: string;
  passwordHashed: string;
  role: string = 'user' 
  constructor(name: string, email: string, passwordHashed: string,role?:string) {
    this.name = name;
    this.email = email;
    this.passwordHashed = passwordHashed;
    this.role = role || 'user'
  }
}
