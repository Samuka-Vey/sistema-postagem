import * as fs from 'node:fs';
import path from 'node:path';
import { print } from '../utils/print';

const dir = path.resolve(__dirname, './data');
const arquivo = path.resolve(dir, 'textos.txt');

function verificarArquivo() {
  if (!fs.existsSync(arquivo)) {
    throw new Error('Arquivo não existe.');
  }
}

function qtdLinhasVazias(): number | undefined {
  let conteudo = fs.readFileSync(arquivo, { encoding: 'utf-8', flag: 'r' });
  if (conteudo.trim().length === 0) {
    print('Arquivo vazio');
    return;
  }
  let linhas = conteudo.split('\n');
  let contador = 0;
  for (let linha of linhas) {
    if (linha.trim() === '') {
      contador += 1;
    }
  }
  return contador;
}

function numLinhas(): string {
  let conteudo = fs.readFileSync(arquivo, { encoding: 'utf-8', flag: 'r' });
  if (conteudo.trim().length === 0) {
    print('Arquivo vazio');
    return '';
  }
  let linhas = conteudo.split('\n').length;

  let nulas: number = qtdLinhasVazias() ?? 0;
  return `Linhas com linhas nulo ${linhas} e sem linhas nulas ${linhas - nulas}`;
}

export default function main() {
  try {
    verificarArquivo();
    print(qtdLinhasVazias());
    print(numLinhas());
  } catch (err) {
    print(err);
  }
}
