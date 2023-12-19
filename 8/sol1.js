import { promises as fs } from 'node:fs';

const [rl, _, ...nodeList] = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const nodes = nodeList.reduce((nodes, node) => {
    let [_, n, r, l] = node.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);
    nodes[n] = [r, l];
    return nodes
}, {});

let cur = 'AAA';
let steps = 0;
while (cur != 'ZZZ') {
    cur = nodes[cur][rl[steps % rl.length] == 'R' ? 1 : 0];
    steps++;
}
console.log(steps)