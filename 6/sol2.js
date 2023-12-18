import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const [time, distance] = lines.map(l => parseInt(l.split(':')[1].replaceAll(' ', '')));

const betterWays = (time, distance) => {
    let better = 0;
    for (let i = 1; i < time; i++) {
        if (distance < (time - i) * i)
            better++;
    }
    return better;
}

console.log(betterWays(time, distance));
