import { promises as fs } from 'node:fs';

let [seedsRange, ...maps] = (await fs.readFile('./input.txt', 'utf-8')).toString().split('seeds:')[1].split(/\n[a-z][^:]*:\n/);
seedsRange = seedsRange.replace('\n', '').trim().split(' ').map(n => parseInt(n));
seedsRange = seedsRange.reduce((acc, seed, i) => {
    if (i % 2 == 0) acc.push([seed]);
    else acc[acc.length - 1].push(seed);
    return acc;
}, []);
maps = maps.map(l => l.trim('\n').split('\n').map(l => l.split(' ').map(n => parseInt(n))));

const convert = (inp, m) => {
    // console.log(inp);
    let mapRange = m.find(([source, dest, length]) => inp >= source && inp < source + length);
    if (mapRange)
        return mapRange[1] + inp - mapRange[0];
    return inp;
};

const existSeed = seed => seedsRange.some(([start, length]) => seed >= start && seed <= start + length);

const mapsReversed = maps.reverse();
const locationMap = mapsReversed[0];
locationMap.sort((a, b) => a[0] - b[0])[0];
function* smallestLocations() {
    for (let [source, dest, length] of locationMap)
        for (let j = source; j < source + length; j++)
            yield j;
}
for (let location of smallestLocations()) {
    let seed = mapsReversed.reduce((inp, m) => convert(inp, m), location);
    //console.log(seed);
    if (existSeed(seed)) {
        console.log(location);
        break;
    }
};
