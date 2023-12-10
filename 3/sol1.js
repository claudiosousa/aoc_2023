import { match } from 'node:assert';
import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const caracters = lines.map(l => l.split(''));
const specialChars = caracters.flatMap((row, ir) =>
    row.map((c, ic) => c != '.' && (c < '0' || c > '9') ? [ir, ic] : null)
        .filter(v => v));
// console.log(specialChars);
const numbersSum = lines.flatMap((row, ir) =>
    [...row.matchAll(/\d+/g)].filter(match =>
        specialChars.some(([cr, cc]) => Math.abs(cr - ir) <= 1 && cc >= match.index - 1 && cc <= match.index + match['0'].length + 1)
    )
        .map(match => parseInt(match['0'])));
console.log(numbersSum.reduce((acc, v) => acc + v, 0));