import fs from 'node:fs';

export function input(question?: string): string {
  if (question) process.stdout.write(question);

  const buffer = Buffer.alloc(1024);
  const bytesRead = fs.readSync(0, buffer, 0, buffer.length, null);

  return buffer.toString('utf8', 0, bytesRead).trim();
}

export function print(...args: unknown[]): void {
  console.log(...args);
}
