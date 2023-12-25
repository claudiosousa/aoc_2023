import { readFileSync } from 'node:fs';

let maps = readFileSync('./input.txt', 'utf-8').toString()
    .split('\n\n')
    .map(l => l.split('\n'));

const areColumnsReflection = (icol, map) => {
    for (let i = 0; i <= icol; i++) {
        if (i + icol + 1 >= map[0].length)
            break;
        for (let j = 0; j < map.length; j++) {
            if (map[j][icol - i] != map[j][icol + i + 1])
                return false;
        }
    }
    return true;
}

const areRowsReflection = (irow, map) => {
    let smudges = 0;
    for (let i = 0; i <= irow; i++) {
        if (i + irow + 1 >= map.length)
            break;
        for (let j = 0; j < map[0].length; j++) {
            if (map[irow - i][j] != map[irow + i + 1][j])
                smudges++;
        }
    }
    return smudges == 1;
}

const colsRowsBeforeReflection = map => {
    for (let i = 0; i < map[0].length - 1; i++) {
        if (areColumnsReflection(i, map))
            return i + 1;
    }
    for (let i = 0; i < map.length - 1; i++) {
        if (areRowsReflection(i, map))
            return 100 * (i + 1);
    }
    return 0;
}
console.log(maps.map(map => colsRowsBeforeReflection(map)).reduce((sum, v) => sum + v, 0));
