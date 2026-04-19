import { print } from '../utils/print';
import { input } from '../utils/input';

function validate_upper(pass: string): boolean {
  return /[A-Z]/.test(pass);
}

function validate_lower(pass: string): boolean {
  return /[a-z]/.test(pass);
}

function validate_number(pass: string): boolean {
  return /[0-9]/.test(pass);
}

function validate_special(pass: string): boolean {
  return /[^a-zA-Z0-9]/.test(pass);
}

function validate_length(pass: string): boolean {
  return pass.length >= 8;
}

export default function main() {
  let password = input();
  while (password != undefined) {
    if (
      validate_length(password) &&
      validate_upper(password) &&
      validate_lower(password) &&
      validate_number(password) &&
      validate_special(password)
    ) {
      print('Senha valida.');
    } else {
      print('Senha invalida.');
    }
    password = input();
  }
}
