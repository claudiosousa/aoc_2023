import { readFileSync } from 'node:fs';
//import { readFileSync } from 'fs';

let map = readFileSync('./input.txt', 'utf-8').toString().split('\n').map(l => l.split(''));
const expandUniverse = () => {
    let j = 0;
    while (j < map[0].length - 1) {
        if (map.every(l => l[j] == '.')) {
            map = map.map(l => l.splice(j, 0, '.') && l)
            j++;
        }
        j++;
    }
    let i = 0;
    while (i < map.length - 1) {
        if (map[i].every(c => c == '.')) {
            map.splice(i, 0, map[i].map(v => v))
            i++;
        }
        i++;
    }
}
expandUniverse();

const galaxies = map.reduce((lst, l, i) => [...lst, ...l.map((c, j) => c == '#' ? [i, j] : null).filter(v => v)], []);

let totalDist = 0;
for (let i = 0; i < galaxies.length; i++) {
    const gi = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
        const gj = galaxies[j];
           // @ts-ignore
           totalDist += Math.abs(gi[0] - gj[0]) + Math.abs(gi[1] - gj[1])
    }
} 
console.log(totalDist);