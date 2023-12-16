import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const points = lines.map(l => l.split(':')[1]
    .split('|')
    .map(p => p.split(' ')
        .filter(v => v)
        .map(v => parseInt(v))))
    .map(([winning, cards]) => {
        let found = cards.filter(v => winning.some(c => c == v)).length;
        return found == 0 ? 0 : Math.pow(2, found - 1);
    }).reduce((acc, v) => acc + v);

console.log(points);