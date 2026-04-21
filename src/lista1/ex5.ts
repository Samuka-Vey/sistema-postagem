import { print, input } from '../utils/utils';

function frequencia(text: string): Record<string, number> {
  let data: Record<string, number> = {};
  let aux = text.split(' ');

  let index = 0;
  while (aux[index] !== undefined) {
    data = {
      ...data,
      [aux[index]]: text.split(aux[index]).length - 1,
    };

    index++;
  }
  return data;
}

function palavras_diferentes(data: Record<string, number>): number {
  return Object.keys(data).length;
}

function total_palavras(data: Record<string, number>): number {
  let total = 0;
  Object.values(data).forEach((value) => {
    total += value;
  });
  return total;
}

function top10_palavras(data: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  );
}

function normalizar(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, '');
}

export default function main() {
  let text =
    'A justiça é a vingança do homem em sociedade, sociedade? sociedade! como a vingança é a justiça do homem em estado selvagem.'.toLowerCase();
  text = normalizar(text);
  let freq = frequencia(text);
  print();
  print('Frequencia de cada palavra:');
  print();
  for (let [key, value] of Object.entries(freq)) {
    print(`${key}: ${value}`);
  }
  print();
  print(`Número de palavras diferentes: ${palavras_diferentes(freq)}`);
  print();
  print(`Número total de palavras: ${total_palavras(freq)}`);
  print();

  print('Top 10 palavras');
  print();
  let top10 = top10_palavras(frequencia(text));
  for (let [key, value] of Object.entries(top10)) {
    print(`${key}: ${value}`);
  }
}
