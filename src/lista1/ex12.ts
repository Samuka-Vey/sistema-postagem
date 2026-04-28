/*📜 Regras:
[ x ] Remover espaços extras no início e no fim
[ x ] Substituir múltiplos espaços por apenas um espaço
[ x ] Remover caracteres especiais (! @ # _, etc.), mas manter letras (inclusive acentuadas) e números
[ x ] Deixar tudo em minúsculo
[x] Capitalizar a primeira letra de cada palavra
[ x ] Retornar a string final formatada
*/

import { print } from '../utils/utils';
import path from 'node:path';
import * as fs from 'node:fs';

function readFile() {
  const doc = String(fs.readFileSync(path.resolve(__dirname, 'data/ex12.txt')));
  return doc;
}

function removeSpace(): string {
  const doc = readFile();
  const formatted = doc.trim();
  return formatted;
}

function removeSpaces(): string {
  const doc = removeSpace();
  const verify = doc.split('');
  let elements = '';

  for (let el = 0; el < verify.length; el++) {
    if (!(verify[el] === ' ' && verify[el + 1] === ' ')) {
      elements += verify[el];
    }
  }
  return elements;
}

function removeSpecialChar(): string {
  const doc = removeSpaces();
  const re_undeline = /[_-]+/g;
  let elements = doc.replace(re_undeline, ' ');
  elements = elements.replace(/[^\p{L}\p{N}\s]/gu, '');
  elements = elements.replace(/[0-9]/g, '');
  return elements;
}

function normalize(): string {
  const doc = removeSpecialChar();
  const words = doc.split(' ');
  let text = '';
  for (let word of words) {
    word = word.toLowerCase();
    word = word.charAt(0).toUpperCase() + word.slice(1);
    text += word + ' ';
  }
  return text.trim();
}

function main() {
  print(normalize());
}

export { main };
