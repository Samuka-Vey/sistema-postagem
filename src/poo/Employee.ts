import { User } from './User';
import { UserDTO } from './dtos/UserDTO';
export class Employee extends User {
  constructor({ name, age, typeUser }: UserDTO) {
    super(name, age, typeUser);
  }

  showEmployee() {
    console.log(this);
  }
}
