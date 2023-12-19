import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n').map(l => l.split(' '));
const frequencyMap = word => word.split('').reduce((acc, c) => {
    c in acc ? acc[c] += 1 : acc[c] = 1;
    return acc;
}, {});

const handType = card => {
    let freq = frequencyMap(card);
    let jokers = freq['J'] || 0;
    let counts = Object.keys(freq).length;
    const maxCount = Math.max.apply(null, Object.values(freq));
    switch (counts) {
        case 1: return 1;
        case 2: return jokers ? 1 : (maxCount == 4 ? 2 : 3);
        case 3: return maxCount == 3 ? (jokers ? 2 : 4) : (jokers ? 4 - jokers : 5);
        case 4: return jokers ? 4 : 6;
        case 5: return jokers ? 6 : 7;
    };
};
let cardValues = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    'J': 1
};
const highestCompare = (a, b) => {
    for (let i = 0; i < 5; i++) {
        let av = cardValues[a[i]], bv = cardValues[b[i]]
        if (av != bv)
            return av - bv;
    }
}

let cards = lines.map(l => [...l, handType(l[0])]);
cards.sort((a, b) =>
    b[2] != a[2] ? b[2] - a[2] : highestCompare(a[0], b[0])
);
cards = cards.map(c => [...c, frequencyMap(c[0])['J'] || 0]);
//console.table(cards);
console.log(cards.reduce((acc, c, i) => acc + parseInt(c[1]) * (i + 1), 0));