import { promises as fs } from 'node:fs';

const series = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n').map(l => [l.split(' ').map(n => parseInt(n))]);
const nextNumber = serie => {
    let notDone = true;
    while (notDone) {
        const lastLine = serie[serie.length - 1];
        let nextDeriv = [];
        notDone = false;
        for (let i = 0; i < lastLine.length - 1; i++) {
            let interval = lastLine[i + 1] - lastLine[i];
            nextDeriv.push(interval);
            if (interval != 0)
                notDone = true;
        }
        if (nextDeriv.length)
            serie.push(nextDeriv);
    }
    let prevValue = 0;
    for (let i = serie.length - 1; i >= 0; i--) {
        prevValue = serie[i][0] - prevValue;
    }
    return prevValue;
};

console.log(series.reduce((sum, s) => sum + nextNumber(s), 0));