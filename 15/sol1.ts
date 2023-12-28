import { readFileSync } from 'node:fs';

let instructions = readFileSync('./input.txt', 'utf-8').toString()
    .split(',');

const hash = (s: string) => {
    let v = 0;
    for (let i = 0; i < s.length; i++) {
        v += s.charCodeAt(i);
        v *= 17;
        v %= 256;
    }
    return v;
}

console.log(instructions.map(step => hash(step)).reduce((sum, v) => sum + v, 0));
