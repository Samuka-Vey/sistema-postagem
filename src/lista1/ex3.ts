import { print, input } from '../utils/utils';

export default function main(): void {
  let nome = String(input('Digite seu nome: '));
  print(`Olá, ${nome}! Bem-vindo ao TypeScript!`);
}
