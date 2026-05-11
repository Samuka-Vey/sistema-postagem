import { User } from './User';
class Client {
  constructor(private user: User) {}

  showClient() {
    console.log(this.user);
  }
}

export { Client };
