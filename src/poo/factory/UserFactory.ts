import { Client } from '../Client';
import { User } from '../User';
import { Employee } from '../Employee';
import { UserDTO } from '../dtos/UserDTO';

export class UserFactory {
  static createClient(user: User): Client {
    return new Client(user);
  }

  static createEmployee(user: User): Employee {
    const dto = UserDTO.fromUser(user);
    return new Employee(dto);
  }
}
