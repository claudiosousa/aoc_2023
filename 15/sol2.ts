import { readFileSync } from 'node:fs';

let instructions = readFileSync('./input.txt', 'utf-8').toString()
    .split(',').map(ins => {
        let [_, code, op, val] = ins.match(/(\w+)(-|=)(\d*)/);
        let valNb = parseInt(val);
        return isNaN(valNb) ? [code, op] : [code, op, valNb];
    });

const hash = (s: string) => {
    let v = 0;
    for (let i = 0; i < s.length; i++) {
        v += s.charCodeAt(i);
        v *= 17;
        v %= 256;
    }
    return v;
}

let boxes = Array(256).fill(0).map((_, i) => [{}, []]);

const focusingPower = boxes =>
    boxes.flatMap((box, ibox) => box[1].map(([code, focal], ilens) => (1 + ibox) * (1 + ilens) * focal))
        .reduce((sum, pwr) => sum + pwr, 0);

instructions.forEach(([code, op, val]) => {
    // @ts-ignore
    let ibox = hash(code)
    let box = boxes[ibox];
    if (op === '-') {
        delete box[0][code];
        // @ts-ignore
        box[1] = box[1].filter(([boxCode]) => boxCode != code);
    } else if (op === '=') {
        if (code in box[0]) {
            // @ts-ignore
            let boxMd = box[1].find(([boxCode]) => boxCode == code);
            boxMd[1] = val;
        } else {
            // @ts-ignore
            box[1].push([code, val]);
        } box[0][code] = val;
    }
});
//console.log(boxes.filter(box => box[1].length > 0));
console.log(focusingPower(boxes));