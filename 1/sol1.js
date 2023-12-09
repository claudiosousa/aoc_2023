import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const numbers = lines.map(x => x.split('').filter(c => c >= '0' && c <= '9'));//.map(n => Number.parseInt(n)));

const res = numbers.map(n=>parseInt(n[0]+n[n.length-1])).reduce((acc, v )=> acc+ v, 0);
console.log(res)