import * as fs from 'node:fs';
import path from 'node:path';
import { print } from '../utils/utils';

const dir = path.resolve(__dirname, './data');
const path_dir = path.resolve(dir, 'compras.txt');
const path_save = path.resolve(dir, 'compras-organizada.txt');
function getCompras(path: string): string[] {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '', 'utf-8');
  }

  const comprasLista = String(
    fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' })
  );

  return comprasLista.split('\n');
}

function removerLinhasNull(): string[] {
  let lista = getCompras(path_dir);

  let semNull: string[] = [];
  for (let elementos = 0; elementos < lista.length; elementos++) {
    if (lista[elementos].trim() !== '') semNull.push(lista[elementos]);
  }
  return semNull;
}

function elimiarEspacos(): string[] {
  let lista = removerLinhasNull();
  let semEspacos = lista.map((el) => el.trim());
  return semEspacos;
}

function ordenar() {
  let lista = elimiarEspacos();
  let ordem = lista.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  return ordem;
}

function duplicador(): string {
  let lista = ordenar();

  let limpar = [...new Set(lista)];

  return limpar.join('\n');
}

function save(path: string) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '', 'utf-8');
  }
  fs.writeFileSync(path, duplicador(), { flag: 'w' });
}
export default function main() {
  print(duplicador());
  save(path_save);
}
