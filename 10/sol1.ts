import { promises as fs } from 'node:fs';
const map = (await fs.readFile('./input.txt', 'utf-8')).toString().split('\n').map(l => l.split(''));

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

const getLoopLengthFromPos = (x: number, y: number, steps: number, incomingDirection: Direction, walkedPath: Direction[]) => {
    while (map[y][x] != 'S') {

        let nextDirection = getNextDirection(x, y, incomingDirection);
        [x, y] = getNewPosWithDirection(x, y, nextDirection);
        if (!isValidPos(x, y))
            return;

        walkedPath.push(nextDirection);
        steps++; incomingDirection = nextDirection ^ 4;

    }
    return steps;
}

const getLoopLength = () => {
    let [x, y] = map.reduce((res, line, row) => {
        if (res)
            return res;
        let col = line.findIndex(c => c == 'S');
        return col >= 0 ? [col, row] : null;
    }, null);

    //console.log('Start pos', x, y);
    for (let direction of [Direction.Down, Direction.Up, Direction.Left, Direction.Right]) {
        [x, y] = getNewPosWithDirection(x, y, direction);

        if (!isValidPos(x, y))
            continue;

        let walkedPath = [direction];

        let loopLength = getLoopLengthFromPos(x, y, 1, direction ^ 4, walkedPath);
        if (loopLength) {
            //console.log(walkedPath)
            return Math.ceil(loopLength / 2);
        }
    }
};

console.log(getLoopLength());
