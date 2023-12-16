import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
let price = [];
const cardsCount = lines.map(l => l.split(':')[1]
    .split('|')
    .map(p => p.split(' ')
        .filter(v => v)
        .map(v => parseInt(v))))
    .map(([winning, cards]) => {
        let found = cards.filter(v => winning.some(c => c == v)).length;
        let wins = 1 + price.length;
        //console.log(found, found * wins, wins, price);
        price = price.map(p => p - 1).filter(p => p > 0);
        if (found)
            for (let i = 0; i < wins; i++)
                price.push(found);
        return found * wins + 1;
    }).reduce((acc, v) => acc + v);

console.log(cardsCount);