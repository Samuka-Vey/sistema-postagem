import * as fs from 'node:fs';
import path from 'node:path';
import { print } from '../utils/print';

const dir = path.resolve(__dirname, './data');
const arquivo_path = path.resolve(dir, 'fichas.txt');

function verificarArquivo() {
  if (!fs.existsSync(arquivo_path)) {
    throw new Error('Arquivo não existe.');
  } else {
    print('Arquivo encontrado.');
  }
}

function lerArquivo(path: string): string {
  let arquivo = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });
  if (arquivo.trim().length == 0) {
    print('Arquivo vazio');
    return '';
  }

  return arquivo;
}

function normalizar(): Record<string, number> {
  let arquivo: string[] = lerArquivo(arquivo_path).toLowerCase().split('\n');

  const dados = {
    A: 0,
    P: 0,
  };

  for (let i = 0; i < arquivo.length; i++) {
    const linha = arquivo[i].trim();

    if (linha.startsWith('a')) {
      dados.A++;
    } else if (linha.startsWith('p')) {
      dados.P++;
    }
  }

  return dados;
}

let filaA: string[] = [];
let filaP: string[] = [];
let inicializado = false;

function chamar() {
  if (!inicializado) {
    const senhas = normalizar();

    for (let i = 1; i <= senhas.A; i++) {
      filaA.push(`A${String(i).padStart(3, '0')}`);
    }

    for (let i = 1; i <= senhas.P; i++) {
      filaP.push(`P${String(i).padStart(3, '0')}`);
    }

    inicializado = true;
  }

  if (filaP.length > 0) {
    print(filaP.shift());
  } else if (filaA.length > 0) {
    print(filaA.shift());
  } else {
    print('Nenhuma senha');
  }
}

export default function main() {
  try {
    verificarArquivo();
    normalizar();
    chamar();
    chamar();
  } catch (err) {
    print(err);
  }
}
