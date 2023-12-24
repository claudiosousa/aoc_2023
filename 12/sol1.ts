import { readFileSync } from 'node:fs';

let lines = readFileSync('./input.txt', 'utf-8').toString()
    .split('\n')
    .map(l => {
        let [springs, md] = l.split(' ');
        return [springs.split(''), md.split(',').map(v => parseInt(v))]
    });

const isValidArrangement = (springs, md) => {
    let cur = 0;
    let imd = 0;
    for (let i = 0; i < springs.length; i++) {
        if (springs[i] == '#') {
            cur++;
        } else if (springs[i] == '.' && cur > 0) {
            if (md[imd] == cur) {
                cur = 0;
                imd++;
            } else return false;
        }
    }
    if (imd < md.length && md[imd] == cur) {
        cur = 0;
        imd++;
    }
    return cur == 0 && imd == md.length;
}

const arrangements = (springs, md, i = 0) => {
    if (i >= springs.length)
        return isValidArrangement(springs, md) ? 1 : 0;
    if (springs[i] == '?') {
        springs[i] = '#';
        let res = arrangements(springs, md, i + 1);
        springs[i] = '.';
        res += arrangements(springs, md, i + 1);
        springs[i] = '?';
        return res;
    }
    return arrangements(springs, md, i + 1);
}
console.log(lines.reduce((s, [l, md]) => s + arrangements(l, md), 0));
