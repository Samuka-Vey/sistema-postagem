import { input } from '../utils/input';
import { print } from '../utils/print';

function enter(): string[] {
  let inp: string | undefined = input();
  let enter: string[] = [];
  while (inp !== undefined) {
    enter.push(inp);
    inp = input();
  }
  return enter;
}

function create_pass() {
  let stdio = enter();

  let stack = {
    groupA: 0,
    groupB: 0,
  };

  for (let i = 0; i < stdio.length; i++) {
    if (stdio[i].toLowerCase() == 'a') {
      stack.groupA++;
    } else if (stdio[i].toLowerCase() == 'p') {
      stack.groupB++;
    }
  }
  return stack;
}
function generate_ticket() {
  let { groupA, groupB } = create_pass();

  let save: string[] = [];

  ['A', 'P'].forEach((prefix, idx) => {
    let total = idx === 0 ? groupA : groupB;
    for (let i = 1; i <= total; i++) {
      save.push(`${prefix}${String(i).padStart(3, '0')}`);
    }
  });

  return save;
}

function history_call() {
  let tickets = generate_ticket();
  let buffer: string[] = [];
  for (let users = 0; users < 5; users++) {
    buffer.push(tickets[users]);
  }
  return buffer.join('\n');
}

function call(): void {
  let users = generate_ticket();

  for (let i = 0; i < users.length; i++) {
    let aux = users[i][0];
    if (aux == 'A') print(`Fila comum: ${users[i]}`);
    else print(`Fila de prioridade: ${users[i]}`);
  }
}

export default function main(): void {
  print(history_call());
  call();
}
