import { readFileSync } from 'node:fs';

let maps = readFileSync('./input.txt', 'utf-8').toString()
    .split('\n\n')
    .map(l => l.split('\n')
        .map(l => l.split('')));

const tiltNorth = map => {
    let load = 0;
    for (let icol = 0; icol < map[0].length; icol++) {
        let emptyAbove = 0;
        for (let irow = 0; irow < map.length; irow++) {
            switch (map[irow][icol]) {
                case '.':
                    emptyAbove++;
                    break
                case 'O':
                    load += emptyAbove + map.length - irow;
                    break
                case '#':
                    emptyAbove = 0;
                    break
            }
        }
    }
    return load;
}
console.log(maps.map(map => tiltNorth(map)).reduce((sum, v) => sum + v, 0));
