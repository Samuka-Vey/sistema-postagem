import { print, input } from '../utils/utils';
import path from 'node:path';
import fs from 'node:fs';

const dir = path.resolve(__dirname, 'data');
const dirFull = path.resolve(dir, 'stdio.txt');

if (!fs.existsSync(dirFull)) {
  fs.writeFileSync(dirFull, '');
}

function readFile(): string {
  const doc = fs.readFileSync(dirFull, 'utf8');

  if (!(doc.trim().split('\n').length - 1 > 0)) {
    throw new Error('Documento vazio');
  }

  return doc;
}

function formatSpace(): string {
  const doc = readFile();
  let elements = '';
  for (let element of doc.split('\n')) {
    elements += element.trim() + '\n';
  }
  return elements;
}

function formatLineNull(): string {
  const doc = formatSpace().split('\n');

  const elements = [];

  for (let element of doc) {
    if (element.trim() == '') {
      continue;
    }

    elements.push(element);
  }

  return elements.join('\n');
}

function formatSpecialChar(): string {
  let doc = formatLineNull();
  let elements = [];
  const verify_char = /[0-9]/;

  for (let element of doc.split('\n')) {
    if (verify_char.test(element)) {
      continue;
    }
    element = element.replace(/[^\p{L}\p{N}\s]/gu, '');
    elements.push(element);
  }
  return elements.join('\n');
}

function formatRepeated(): string {
  const doc = formatSpecialChar().split('\n');
  return [...new Set(doc)].join('\n');
}

function formatOrder(): string {
  const doc = formatRepeated();
  return doc.split('\n').sort().join('\n');
}

function formatCase(): string {
  const doc = formatOrder().split('\n');
  for (let element = 0; element < doc.length; element++) {
    doc[element] =
      doc[element].charAt(0).toUpperCase() +
      doc[element].slice(1).toLocaleLowerCase();
  }
  return doc.join('\n');
}

function main() {
  try {
    let aux = formatCase();
    fs.writeFileSync(dirFull, aux);
  } catch (error) {
    if (error instanceof Error) {
      print(error.message);
    }
  }
}

export { main };
