import { StudyGeneric, DataBase } from './poo/generics/aula01';

const el = new StudyGeneric(['a', 'b', 'c']);
const el2 = new StudyGeneric([1, 2, 3]);
const el3 = new StudyGeneric([true, false, true]);
const db = new DataBase();

db.addUser({
  name: 'Samuelson',
  age: 22,
  email: '',
});

const list = db.listUsers();

el.firstElement();
el2.firstElement();
el3.firstElement();
el.showArray();
console.log(list);
