import * as fs from 'node:fs';
import path from 'node:path';

const inputPath = path.resolve(__dirname, 'stdin.txt');

let input = fs.readFileSync(inputPath, 'utf8');
var lines = input.split(/\s+/);
var currentLine = 0;

export default function input_ready(): string {
  return lines[currentLine++];
}
