import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const [times, distances] = lines.map(l => l.split(':')[1].split(' ').filter(v => v).map(v => parseInt(v)));

const courses = times.map((t, i) => [t, distances[i]]);
const betterWays = (time, distance) => {
    let better = 0;
    for (let i = 1; i < time; i++) {
        if (distance < (time - i) * i)
            better++;
    }
    return better;
}

console.log(courses.reduce((acc, [time, distance]) => betterWays(time, distance) * acc, 1));
