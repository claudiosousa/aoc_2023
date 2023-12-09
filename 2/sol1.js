import { promises as fs } from 'node:fs';

const lines = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n');
let res = 0;
for (let line of lines) {
    let r = line.match('Game (\\d+): (.*)');
    let id = r[1];
    let matches = r[2];
    let match;
    let matchOk = true;
    while (match = matches.match('(\\d+) (red|blue|green)')) {
        let nb = parseInt(match[1]);
        let color = match[2];
        matches = matches.substring(match.index + match[0].length)
        if ((color == 'red' && nb > 12)
            || (color == 'green' && nb > 13)
            || (color == 'blue' && nb > 14)
        ) {
            matchOk = false;
            break;
        }
    }
    if (matchOk)
        res += parseInt(id);
}
console.log(res)