import { print, input } from '../utils/utils';

export default function main(): void {
  let nome = String(input('Digite seu nome completo: ')).trim();
  let sobrenome = nome.split(' ');

  for (let i = 0; i < sobrenome.length; i++) {
    if (sobrenome[i].length <= 2) {
      sobrenome.splice(i, 1);
    }
  }
  let ultimo_elemento = sobrenome.length - 1;
  let nome_formatado =
    `${sobrenome[0]}.${sobrenome[ultimo_elemento]}`.toLowerCase();

  let n = nome_formatado.split('').map((el) => {
    return el.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  });

  print(n.join(''));
}
