import { User } from '../User';
export class UserDTO {
  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly typeUser: 'employee' | 'client'
  ) {}

  static fromUser(user: User): UserDTO {
    return new UserDTO(user.name, user.age, user.typeUser);
  }
}
