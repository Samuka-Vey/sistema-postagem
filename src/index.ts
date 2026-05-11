import { UserFactory } from './poo/factory/UserFactory';

const client = UserFactory.createClient({
  name: 'John Doe',
  age: 30,
  typeUser: 'client',
});

const employee = UserFactory.createEmployee({
  name: 'Jane Smith',
  age: 25,
  typeUser: 'employee',
});

console.log(client);
console.log(employee);
