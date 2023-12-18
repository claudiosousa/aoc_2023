import { promises as fs } from 'node:fs';

let [seedsRange, ...maps] = (await fs.readFile('./input.txt', 'utf-8')).toString().split('seeds:')[1].split(/\n[a-z][^:]*:\n/);
seedsRange = seedsRange.replace('\n', '').trim().split(' ').map(n => parseInt(n));
function* getAllSeeds() {
    let i = 0;
    while (i < seedsRange.length) {
        let start = seedsRange[i];
        let range = seedsRange[i + 1]

        for (let j = 0; j < range; j++)
            yield start + j;
        i += 2;
    }
}

maps = maps.map(l => l.trim('\n').split('\n').map(l => l.split(' ').map(n => parseInt(n))));
const convert = (inp, m) => {
    // console.log(inp);
    let mapRange = m.find(([dest, source, length]) => inp >= source && inp < source + length);
    if (mapRange)
        return mapRange[0] + inp - mapRange[1];
    return inp;
};


const minLocation = getAllSeeds().reduce((minLocation, s) => Math.min(minLocation, maps.reduce((inp, m) => convert(inp, m), s)), Number.MAX_SAFE_INTEGER);
console.log(minLocation);