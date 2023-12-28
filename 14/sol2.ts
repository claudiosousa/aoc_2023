import { readFileSync } from 'node:fs';

let maps = readFileSync('./input.txt', 'utf-8').toString()
    .split('\n\n')
    .map(l => l.split('\n')
        .map(l => l.split('')));

const printMap = map => console.log(map.map(l => l.join('')).join('\n'));

const calculateLoad = map => {
    let load = 0;
    for (let icol = 0; icol < map[0].length; icol++) {
        for (let irow = 0; irow < map.length; irow++) {
            if (map[irow][icol] == 'O') {
                load += map.length - irow;
            }
        }
    }
    return load;
}
const tiltNorth = map => {
    for (let icol = 0; icol < map[0].length; icol++) {
        let emptyAbove = 0;
        for (let irow = 0; irow < map.length; irow++) {
            switch (map[irow][icol]) {
                case '.':
                    emptyAbove++;
                    break
                case 'O':
                    map[irow][icol] = '.';
                    map[irow - emptyAbove][icol] = 'O';
                    break
                case '#':
                    emptyAbove = 0;
                    break
            }
        }
    }
}
const tiltWest = map => {
    for (let irow = 0; irow < map.length; irow++) {
        let emptyAbove = 0;
        for (let icol = 0; icol < map[0].length; icol++) {
            switch (map[irow][icol]) {
                case '.':
                    emptyAbove++;
                    break
                case 'O':
                    map[irow][icol] = '.';
                    map[irow][icol - emptyAbove] = 'O';
                    break
                case '#':
                    emptyAbove = 0;
                    break
            }
        }
    }
}
const tiltSouth = map => {
    for (let icol = 0; icol < map[0].length; icol++) {
        let emptyAbove = 0;
        for (let irow = map.length - 1; irow >= 0; irow--) {
            switch (map[irow][icol]) {
                case '.':
                    emptyAbove++;
                    break
                case 'O':
                    map[irow][icol] = '.';
                    map[irow + emptyAbove][icol] = 'O';
                    break
                case '#':
                    emptyAbove = 0;
                    break
            }
        }
    }
}
const tiltEast = map => {
    for (let irow = 0; irow < map.length; irow++) {
        let emptyAbove = 0;
        for (let icol = map[0].length - 1; icol >= 0; icol--) {
            switch (map[irow][icol]) {
                case '.':
                    emptyAbove++;
                    break
                case 'O':
                    map[irow][icol] = '.';
                    map[irow][icol + emptyAbove] = 'O';
                    break
                case '#':
                    emptyAbove = 0;
                    break
            }
        }
    }
}
const cycle = map => {
    tiltNorth(map);
    tiltWest(map);
    tiltSouth(map);
    tiltEast(map);
    return calculateLoad(map);
};

const findLoadAfter1000000000Cycles = map => {
const initialOffset = 200;
    for (let i = 0; i < initialOffset; i++) {
        cycle(map);
    }
    let loads = Array.from(Array(200)).map(() => cycle(map));
    for (let j = 1; j < loads.length; j++) {
        if (loads[0] != loads[j])
            continue;
        let cycleLength = j;
        let cycleOk = true;
        for (let k = 1; k < cycleLength * 3; k++) {
            if (loads[j + k] != loads[k]) {
                cycleOk = false;
                break;
            }
        }
        if (cycleOk)
            return loads[(1000000000 - initialOffset - 1) % cycleLength]
    }
    return -1;
};

// console.log(maps.map(map => findFrequency(map)).reduce((sum, v) => sum + v, 0));
console.log(maps.map(map => findLoadAfter1000000000Cycles(map)));
