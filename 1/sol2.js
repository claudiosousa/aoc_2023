import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');

let sum = 0;
for (let line of lines) {
    let first = Number.MAX_SAFE_INTEGER, firstD, last = -1, lastD;
    for (let i = 0; i < numbers.length; i++) {
        let idx = line.indexOf(numbers[i]);
        if (idx > -1 && idx < first) {
            firstD = i < 9 ? i + 1 : numbers[i];
            first = idx
        }
        let lastIdx = line.lastIndexOf(numbers[i]);
        if (lastIdx > last) {
            lastD = i < 9 ? i + 1 : numbers[i]
            last = lastIdx;
        }
    }
    sum += parseInt( firstD + "" + lastD);
}

console.log(sum)
