import { promises as fs } from 'node:fs';

let [seeds, ...lines] = (await fs.readFile('./input.txt', 'utf-8')).toString().split('seeds:')[1].split(/\n[a-z][^:]*:\n/);
seeds = seeds.replace('\n', '').trim().split(' ').map(n => parseInt(n));
lines = lines.map(l => l.trim('\n').split('\n').map(l => l.split(' ').map(n => parseInt(n))));
console.log(seeds, lines);