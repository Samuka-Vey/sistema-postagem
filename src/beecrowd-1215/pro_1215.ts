import { print } from '../utils/print';
import { input } from '../utils/input';

function enter_words() {
  let line: string | undefined = input();
  let words: string = '';
  while (line !== undefined) {
    words += line + '\n';
    line = input();
  }

  return words;
}

export default function main(): string {
  let word: string[] = enter_words().split(/\s+/);

  let unique = new Set<string>();

  for (let i = 0; i < word.length; i++) {
    let cleaned = word[i].toLowerCase().replace(/[^a-zA-Z]/g, '');
    if (cleaned !== '') {
      unique.add(cleaned);
    }
  }

  return [...unique].sort().join('\n');
}

let teste = main();
print(teste);
