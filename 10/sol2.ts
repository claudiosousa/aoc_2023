import { readFileSync } from 'node:fs';
//import { readFileSync } from 'fs';

const map = readFileSync('./input.txt', 'utf-8').toString().split('\n').map(l => l.split(''));

enum Direction { Down = 1, Up = Direction.Down ^ 4, Left = 2, Right = Direction.Left ^ 4 };

const getPipeDirections = pipe => {
    switch (pipe) {
        case '|': return new Set([Direction.Up, Direction.Down]);
        case '-': return new Set([Direction.Left, Direction.Right]);
        case 'L': return new Set([Direction.Up, Direction.Right]);
        case 'J': return new Set([Direction.Up, Direction.Left]);
        case '7': return new Set([Direction.Down, Direction.Left]);
        case 'F': return new Set([Direction.Down, Direction.Right]);
        case '.': return null;
    }
};

const getNextDirection = (x: number, y: number, incomingDirection: Direction) => {
    let pipe = map[y][x];
    let pipeDirections = getPipeDirections(pipe);
    if (!pipeDirections)
        return;
    pipeDirections.delete(incomingDirection);
    return pipeDirections.values().next().value;
};

const isValidPos = (x: number, y: number) => {
    if (x < 0 || y < 0)
        return false;
    if (x >= map[0].length || y >= map.length)
        return false;
    return true;
};

const getNewPosWithDirection = (x: number, y: number, direction: Direction) => {
    switch (direction) {
        case Direction.Down:
            y += 1;
            break
        case Direction.Up:
            y -= 1;
            break
        case Direction.Left:
            x -= 1;
            break
        case Direction.Right:
            x += 1;
            break
    }

    return [x, y];
}

let [startPosX, startPosY] = <number[]>map.reduce((res, line, row) => {
    if (res)
        return res;
    let col = line.findIndex(c => c == 'S');
    return col >= 0 ? [col, row] : null;
}, null);

const getCadrant = (x, y) => {
    if (x < startPosX && y <= startPosY)
        return 1;
    if (x >= startPosX && y < startPosY)
        return 2;
    if (x <= startPosX && y > startPosY)
        return 4;
    if (x > startPosX && y >= startPosY)
        return 3;
}

const getLoopLengthFromPos = (x: number, y: number, steps: number, incomingDirection: Direction, walkedPos: number[][], walkedDirections: Direction[], walkedCadrants: number[]): [number[][], Direction[], number[], number] => {
    while (map[y][x] != 'S') {

        let nextDirection = getNextDirection(x, y, incomingDirection);
        [x, y] = getNewPosWithDirection(x, y, nextDirection);
        if (!isValidPos(x, y))
            return;

        walkedPos.push([x, y]);
        walkedDirections.push(nextDirection);
        let quadrant = getCadrant(x, y);
        if (quadrant && walkedCadrants[walkedCadrants.length - 1] != quadrant)
            if (walkedCadrants.length > 1 && walkedCadrants[walkedCadrants.length - 2] == quadrant)
                walkedCadrants.pop()
            else
                walkedCadrants.push(quadrant)

        steps++;
        incomingDirection = nextDirection ^ 4;
    }
    // @ts-ignore
    return steps;
}
const getLoopLength = () => {
    //console.log('Start pos', startPosX, startPosY);
    for (let direction of [Direction.Down, Direction.Up, Direction.Left, Direction.Right]) {
        let [x, y] = getNewPosWithDirection(startPosX, startPosY, direction);

        if (!isValidPos(x, y))
            continue;

        let walkedDirections = [direction];
        let walkedPos = [[x, y]];
        let walkedCadrants = [getCadrant(x, y)];

        let loopLength = getLoopLengthFromPos(x, y, 1, direction ^ 4, walkedPos, walkedDirections, walkedCadrants);
        if (loopLength) {
            // @ts-ignore
            return [walkedPos, walkedDirections, walkedCadrants, Math.ceil(loopLength / 2)];
        }
    }
};

let [walkedPos, walkedDirections, walkedCadrants, longestDistance] = getLoopLength();
const cadrantGoesClockwise = (walkedCadrants[1] == walkedCadrants[0] + 1) || (walkedCadrants[1] == 1 && walkedCadrants[0] == 4);

const insideCell = (x, y, direction) => {
    switch (direction) {
        case Direction.Down:
            return cadrantGoesClockwise ? [x - 1, y] : [x + 1, y];
        case Direction.Up:
            return cadrantGoesClockwise ? [x + 1, y] : [x - 1, y];
        case Direction.Left:
            return cadrantGoesClockwise ? [x, y - 1] : [x, y + 1];
        case Direction.Right:
            return cadrantGoesClockwise ? [x, y + 1] : [x, y - 1];
    }
}

const fillContinousInnerCells = (usedMap, insideCellX, insideCellY, filled = 0) => {
    for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        let x = insideCellX + dx, y = insideCellY + dy;;
        if (!isValidPos(x, y))
            continue;
        if (usedMap[y][x] == 0) {
            usedMap[y][x] = 2;
            filled++;
            return fillContinousInnerCells(usedMap, x, y, filled);
        }
    }
    return filled;
};

const fillInsideArea = (): [number[][], number] => {
    let usedMap = map.map(l => l.map(_ => 0));
    // @ts-ignore
    for (let i = 0; i < walkedPos.length; i++) {
        let [x, y] = walkedPos[i];
        usedMap[y][x] = 1;
    }
    const fillCellInside = (i, direction) => {
        let filledCells = 0;
        let [x, y] = walkedPos[i];
        let [insideCellX, insideCellY] = insideCell(x, y, direction);
        if (x == 5 && y == 7)
            console.log(x, y, direction, insideCellX, insideCellY, isValidPos(insideCellX, insideCellY))
        if (!isValidPos(insideCellX, insideCellY))
            return filledCells;
        if (!usedMap[insideCellY][insideCellX]) {
            usedMap[insideCellY][insideCellX] = 2;
            filledCells++;
            filledCells += fillContinousInnerCells(usedMap, insideCellX, insideCellY);
        }
        return filledCells;
    };

    let filledCells = 0;
    // @ts-ignore
    for (let i = 0; i < walkedPos.length - 1; i++) {
        let direction = walkedDirections[i];
        filledCells += fillCellInside(i, direction);
        // @ts-ignore
        if (i < walkedPos.length - 2) {
            let nextDirection = walkedDirections[i + 1];
            if (direction != nextDirection)
                filledCells += fillCellInside(i, nextDirection);
        }
    }
    return [usedMap, filledCells];
}

const [usedMap, insideCells] = fillInsideArea()

//console.log(cadrantGoesClockwise);
//console.table(walkedPos)
//console.table(walkedDirections)
//console.table(walkedCadrants)
//console.log(longestDistance);
console.log(usedMap.map(l => l.map(c => c == 0 ? ' ' : c == 1 ? '▓' : '░').join('')).join('\n'))
console.log(insideCells)

