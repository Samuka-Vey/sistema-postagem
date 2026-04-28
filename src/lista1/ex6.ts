import * as fs from 'node:fs';
import path from 'node:path';
import { input, print } from '../utils/utils';

const dir = path.resolve(__dirname, './data');
const filePath = path.resolve(dir, 'data.json');

// create post
function createPost(title: string, content: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const post = {
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  let posts = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    posts = fileContent ? JSON.parse(fileContent) : [];
  }

  posts.push(post);

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
}

// read post
function readPost(): void {
  if (!fs.existsSync(filePath)) {
    print('Nenhum post encontrado.');
    return;
  }

  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const data of post) {
    print(`Título: ${data.title}`);
    print(`Conteúdo: ${data.content}`);
    print(`Criado em: ${data.createdAt}`);
    print('-------------------------');
  }
}
// search post by title
function searchPost(title: string): void {
  if (!fs.existsSync(filePath)) {
    print('Nenhum post encontrado.');
    return;
  }
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const foundPost = post.find(
    (p: { title: string }) => p.title.toLowerCase() === title.toLowerCase()
  );
  if (foundPost) {
    print('Post encontrado:');
    print(`Título: ${foundPost.title}`);
    print(`Conteúdo: ${foundPost.content}`);
    print(`Criado em: ${foundPost.createdAt}`);
  } else {
    print('Post não encontrado.');
  }
}

// delete post by title
function deletePost(title: string): void {
  if (!fs.existsSync(filePath)) {
    print('Nenhum post encontrado.');
    return;
  }

  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const updatedPosts = post.filter(
    (p: { title: string }) => p.title.toLowerCase() !== title.toLowerCase()
  );

  fs.writeFileSync(filePath, JSON.stringify(updatedPosts, null, 2), 'utf8');
  print('Post deletado com sucesso!');
}

function updatePost(title: string, newContent: string): void {
  if (!fs.existsSync(filePath)) {
    print('Nenhum post encontrado.');
    return;
  }

  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const updatedPosts = post.map((p: { title: string; content: string }) => {
    if (p.title.toLowerCase() === title.toLowerCase()) {
      return { ...p, content: newContent };
    }
    return p;
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedPosts, null, 2), 'utf8');
  print('Post atualizado com sucesso!');
}

let path_auto_increment = path.resolve(dir, 'auto_increment.txt');
function autoIncrementPost(): void {
  if (!fs.existsSync(path_auto_increment)) {
    fs.writeFileSync(path_auto_increment, '0', 'utf8');
  }
  let post = fs.readFileSync(path_auto_increment, {
    encoding: 'utf8',
    flag: 'r',
  });

  let newPostAuto = {};
  let buffer = post.split('\n');

  for (let i = 0; i < buffer.length; i++) {
    if (i % 2 === 0) {
      newPostAuto = {
        ...newPostAuto,
        [buffer[i]]: buffer[i + 1],
      };
    } else {
      newPostAuto = {
        ...newPostAuto,
        [buffer[i - 1]]: buffer[i],
      };
    }
  }
  for (let [key, _] of Object.entries(newPostAuto)) {
    print(key.split(`${key}`));
  }
}
export default function main() {
  while (true) {
    print(`
      [1] Criar post
      [2] Ler post
      [3] Buscar post
      [4] Deletar post
      [5] Atualizar post
      [6] auto increment post
      [7] Sair
    `);

    const answer = Number(input('Escolha uma opção: '));

    if (answer === 7) {
      print('Saindo...');
      break;
    }

    if (answer === 1) {
      const title = input('Digite o título do post: ') || '';
      const content = input('Digite o conteúdo do post: ') || '';
      createPost(title, content);
      print('Post criado com sucesso!');
    } else if (answer === 2) {
      readPost();
    } else if (answer === 3) {
      const searchTitle = input('Digite o título do post para buscar: ') || '';
      searchPost(searchTitle);
    } else if (answer === 4) {
      const deleteTitle = input('Digite o título do post para deletar: ') || '';
      deletePost(deleteTitle);
    } else if (answer === 5) {
      const updateTitle =
        input('Digite o título do post para atualizar: ') || '';
      const newContent = input('Digite o novo conteúdo do post: ') || '';
      updatePost(updateTitle, newContent);
    } else if (answer === 6) {
      autoIncrementPost();
    } else {
      print('Opção inválida!');
    }

    const continuar = input('Deseja continuar? (s/n): ').toLowerCase();

    if (continuar !== 's') {
      print('Encerrando...');
      break;
    }
  }
}
