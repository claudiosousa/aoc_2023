import { promises as fs } from 'node:fs';

let [seeds, ...maps] = (await fs.readFile('./input.txt', 'utf-8')).toString().split('seeds:')[1].split(/\n[a-z][^:]*:\n/);
seeds = seeds.replace('\n', '').trim().split(' ').map(n => parseInt(n));
maps = maps.map(l => l.trim('\n').split('\n').map(l => l.split(' ').map(n => parseInt(n))));
//console.log(seeds, maps);
const convert = (inp, m) => {
    // console.log(inp, m);
    let res = m.map(([dest, source, length]) =>
        inp >= source && inp < source + length ? dest + inp - source : null
    ).reduce((acc, v) => v != null ? v : acc, inp);
    //console.log(inp, '=>', res);
    return res;
};

const locations = seeds.map(s => maps.reduce((inp, m) => convert(inp, m), s));
console.log(locations.reduce((acc, v) => v < acc ? v : acc, Number.MAX_VALUE));