export class StudyGeneric<T> {
  constructor(public array: T[]) {}

  public firstElement() {
    console.log(this.array[0]);
  }

  public showArray() {
    console.log(this.array);
  }
}
type User = {
  name: string;
  age: number;
  email: string;
};
export class DataBase {
  private data: User[] = [];

  public addUser(user: User): Required<User> {
    this.data.push(user);

    return user;
  }

  public listUsers(): ReadonlyArray<User> {
    return this.data;
  }
}
