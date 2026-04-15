import * as fs from 'node:fs';
const dir: string = 'src/data';
const path: string = `${dir}/users.txt`;

// ler usuário
export function readUser(): string | null {
  if (!fs.existsSync(path)) {
    return null;
  }
  const data = fs.readFileSync(path, 'utf-8');
  return data;
}
// cria usuário
export function createUser(id_user: number, name: string, email: string): void {
  const new_user = { id_user, name, email };

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const data = readUser();
  let users: string[] = [];

  if (data && data.trim() !== '') {
    users = data.split('\n');

    for (const user of users) {
      const parsed = JSON.parse(user);

      if (
        parsed.id_user === id_user ||
        parsed.email === email ||
        parsed.name === name
      ) {
        console.log('User already exists. Skipping creation.');
        return;
      }
    }
  }

  users.push(JSON.stringify(new_user));
  fs.writeFileSync(path, users.join('\n'), 'utf-8');
  console.log('User created successfully.');
}
// procurar usuário
export function findUser(id_user: number): string | null {
  const data = readUser();

  let is_find: string | null = '';

  if (!data || data.trim() === '') {
    console.log('No users found. Nothing to delete.');
    return null;
  } else {
    const users = data.split('\n');
    for (const user of users) {
      if (JSON.parse(user).id_user === id_user) {
        return user;
      }
    }
    return null;
  }
}
// deletar usuário
export function deleteUser(id_user: number): void {
  const data = readUser();

  if (!data || data.trim() === '') {
    console.log('No users found. Nothing to delete.');
    return;
  } else {
    const users = data.split('\n');
    const is_find = findUser(id_user);

    if (!is_find) {
      console.log('User not found. Nothing to delete.');
      return;
    } else {
      const updatedUsers = users.filter(
        (user) => JSON.parse(user).id_user !== id_user
      );
      fs.writeFileSync(path, updatedUsers.join('\n'), 'utf-8');
      console.log('User deleted successfully.');
    }
  }
}

export function updateUser(name: string | null, email: string | null): void {
  const data = readUser();

  if (!data || data.trim() === '') {
    console.log('No users found. Nothing to update.');
    return;
  } else {
    const users = data.split('\n');
    const updatedUser = users.map((user) => {
      const parsedUser = JSON.parse(user);
      if (name) {
        parsedUser.name = name;
      }
      if (email) {
        parsedUser.email = email;
      }
      return JSON.stringify(parsedUser);
    });
    fs.writeFileSync(path, updatedUser.join('\n'), 'utf-8');
    console.log('User updated successfully.');
  }
}
