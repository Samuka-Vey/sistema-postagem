import { print, input } from '../utils/utils';

function count_char(word: string): Record<string, number> {
  let data = {};
  for (let char = 0; char < word.length; char++) {
    data = {
      [word[char]]: word.split(word[char]).length - 1,
      ...data,
    };
  }
  return data;
}

export default function main(): boolean {
  let words = String(input('Digite a palavra: ')).trim().toLowerCase();
  let letter_available = String(input('Digite as letras disponiveis: '))
    .trim()
    .toLowerCase();

  let count_words = count_char(words);
  let count_available = count_char(letter_available);

  for (let [value, key] of Object.entries(count_words)) {
    for (let [value_available, key_available] of Object.entries(
      count_available
    )) {
      if (value == value_available) {
        if (key > key_available) {
          print('Nao e possivel formar a palavra');
          return false;
        }
      }
    }
  }
  print('E possivel formar a palavra');
  return true;
}
