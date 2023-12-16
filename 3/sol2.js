import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const caracters = lines.map(l => l.split(''));
const maybeGears = caracters.flatMap((row, ir) =>
    row.map((c, ic) => c == '*' ? [ir, ic] : null)
        .filter(v => v));

const numbers = lines.flatMap((row, ir) =>
    [...row.matchAll(/\d+/g)].map(match => ({ col: match.index, row: ir, v: parseInt(match['0']), length: match['0'].length })));

const gears = maybeGears.map(([cr, cc]) =>
    numbers.filter(({ col, row, v, length }) => Math.abs(cr - row) <= 1 && cc >= col - 1 && cc <= col + length))
    .filter(mg => mg.length == 2)
    .map(([n1, n2]) => n1.v * n2.v)
    .reduce((v, acc) => v + acc, 0);
    
console.log(gears);