import * as fs from 'node:fs';
import { print, input } from '../utils/utils';
import path from 'node:path';

let dir = path.resolve(__dirname, './data');

let path_dir = path.resolve(dir, 'diario.txt');

function verifyPath(path: string): boolean {
  if (!fs.existsSync(path)) {
    return false;
  } else {
    return true;
  }
}

function createPath(path: string) {
  if (!verifyPath(path)) {
    fs.writeFileSync(path_dir, '');
  }
}

function modelDate(): string {
  let date = new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function createActivity(name: string, activity: string): string {
  if (!verifyPath(path_dir)) {
    createPath(path_dir);
  }

  let template = `${modelDate()} | ${new Date().getHours()}:${new Date().getMinutes()} | ${name.toLowerCase()} | ${activity}`;

  let existsContent = fs.readFileSync(path_dir, 'utf-8').trim().length > 0;

  fs.writeFileSync(path_dir, (existsContent ? '\n' : '') + template, {
    encoding: 'utf-8',
    flag: 'a',
  });

  return template;
}

function listActivity(): void {
  if (!verifyPath(path_dir)) {
    print('Não é possível ler o arquivo');
    return;
  }

  let activity = fs.readFileSync(path_dir, { encoding: 'utf-8', flag: 'r' });

  print(activity);
}

function countRegisters(path: string): number {
  if (!verifyPath(path)) {
    print('Base de dados vazia.');
    return 0;
  }
  let data = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });
  return data.split('\n').length;
}

function lineNull(path: string) {
  if (!verifyPath(path)) {
    print('Erro inesperado');
    return;
  }
  let data = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });

  let aux = data.split('\n');
  let cleanData: string[] = [];
  for (let i = 0; i < aux.length; i++) {
    if (aux[i].trim() !== '') {
      cleanData.push(aux[i]);
    }
  }
  let existsContent = cleanData.length > 0;

  fs.writeFileSync(path, existsContent ? cleanData.join('\n') + '\n' : '', {
    encoding: 'utf-8',
    flag: 'w',
  });
}

function searchStudent(name: string) {
  if (!verifyPath(path_dir)) {
    print('Erro inesperado');
    return;
  }

  let data = fs.readFileSync(path_dir, 'utf8');
  let data_splited = data.split('\n');
  let found = data_splited
    .join('')
    .split(' | ')
    .filter((item) => item.toLowerCase() === name.toLowerCase()).length;

  print(`O aluno ${name} foi encontrado ${found} vezes.`);

  if (found === 0) {
    print('Aluno não encontrado.');
    return;
  }
  for (let i = 0; i < data_splited.length; i++) {
    if (data_splited[i].toLowerCase().includes(name.toLowerCase())) {
      print(data_splited[i]);
    }
  }
}
export default function main() {
  lineNull(path_dir);
  print();
  searchStudent('Mario');
  print();
  print('Número de registros: ' + countRegisters(path_dir));
  print();
  print('Listando atividades:');
  listActivity();
  print();
  createActivity('Mario', 'Fez a atividade 7 da lista 1');
  lineNull(path_dir);
}
