import { readFileSync } from 'node:fs';

let map = readFileSync('./input.txt', 'utf-8').toString().split('\n').map(l => l.split(''));
const expandRate = 999_999;
const expandUniverse = () => {
    const [extraRows] = map.reduce(([extra, prev], l) => {
        let cur = prev + (l.every(c => c == '.') ? expandRate : 0);
        extra.push(cur);
        return [extra, cur];
    }, [[], 0]);
    let [extraCols] = map[0].reduce(([extra, prev], _, i) => {
        let cur = prev + (map.every(l => l[i] == '.') ? expandRate : 0);
        extra.push(cur);
        return [extra, cur];
    }, [[], 0]);
    return [extraRows, extraCols];
}
const [extraRows, extraCols] = expandUniverse();
// console.log(extraRows);
// console.log(extraCols);
const galaxies = map.reduce((lst, l, i) => [...lst, ...l.map((c, j) => c == '#' ? [i, j] : null).filter(v => v)], []);

//console.log(galaxies);

let totalDist = 0;
for (let i = 0; i < galaxies.length; i++) {
    const gi = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
        const gj = galaxies[j];
        // @ts-ignore
        let gxmin = Math.min(gi[1], gj[1]), gxmax = Math.max(gi[1], gj[1]);
        let extraDistH = extraCols[gxmax] - extraCols[gxmin];
        // @ts-ignore
        let extraDistV = extraRows[gj[0]] - extraRows[gi[0]];
        // @ts-ignore
        totalDist += gxmax - gxmin + Math.abs(gi[0] - gj[0]) + extraDistH + extraDistV;
    }
}
console.log(totalDist);