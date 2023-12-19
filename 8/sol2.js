import { assert } from 'node:console';
import { promises as fs } from 'node:fs';

const [rl, _, ...nodeList] = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
const nodes = nodeList.reduce((nodes, node) => {
    let [_, n, r, l] = node.match(/(\w{3}) = \((\w{3}), (\w{3})\)/);
    nodes[n] = [r, l];
    return nodes
}, {});

let cur = Object.keys(nodes).filter(node => node.endsWith('A'));
let nodeEndPeriocity = cur.map(n => [0, 0, 0]);
let steps = 0;
let periocitiesFound = 0;
while (!cur.every(node => node[2] == 'Z') && periocitiesFound < cur.length) {
    let rlDirection = rl[steps % rl.length] == 'R' ? 1 : 0;
    for (let i = 0; i < cur.length; i++) {
        cur[i] = nodes[cur[i]][rlDirection];
        if (nodeEndPeriocity[i][0] < 2 && cur[i][2] == 'Z') {
            switch (nodeEndPeriocity[i][0]) {
                case 0:
                    nodeEndPeriocity[i][1] = steps;
                    break;
                case 1:
                    nodeEndPeriocity[i][2] = steps - nodeEndPeriocity[i][1];
                    periocitiesFound++;
                    break;
            }
            nodeEndPeriocity[i][0]++;
        }
    }
    steps++;
}

assert(nodeEndPeriocity.every(p => cur[2] = cur[1] + 1), 'Some cycles have an offset');

console.log(`The solution is the LCM(${nodeEndPeriocity.map(p => p[2]).join(', ')})`);

// 22357
// 17263
// 14999
// 16697
// 13301
// 20659
