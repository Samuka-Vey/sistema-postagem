import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
} from './controller/userController';
import { generateId } from './utils/generateId';

// data fake
function main() {
  const id_user = generateId();
  const user = createUser(
    id_user,
    'Marcos Samuel',
    'marcos.samuel@example.com'
  );
  const read_user = readUser();

  return user;
}

main();
