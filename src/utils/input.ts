import * as fs from 'node:fs';
import path from 'node:path';

const inputPath = path.resolve(__dirname, 'stdin.txt');

let inputed = fs.readFileSync(inputPath, 'utf8');
let lines = inputed.split(/\r?\n/);

let currentLine = 0;

export function input(): string | undefined {
  if (currentLine >= lines.length) return undefined;
  return lines[currentLine++];
}
