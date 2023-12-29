import { readFileSync } from 'node:fs';

let map = readFileSync('./input.txt', 'utf-8').toString()
    .split('\n');

let iluminated = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => 0));
enum Direction {
    Up = 1,
    Left = 2,
    Down = 4,
    Right = 8
}
const nextPos = (direction: Direction, irow: number, icol: number) => {
    switch (direction) {
        case Direction.Down:
            irow++;
            break
        case Direction.Up:
            irow--;
            break
        case Direction.Left:
            icol--;
            break
        case Direction.Right:
            icol++;
            break
    }

    return [irow, icol];
};


const iluminate = (direction: Direction, irow: number, icol: number) => {
    let beams = [[direction, irow, icol]];
    while (beams.length) {
        let [direction, irow, icol] = beams.pop();
        //console.log(direction, irow, icol);
        if (irow < 0 || irow >= map.length || icol < 0 || icol >= map[0].length) continue;
        if (iluminated[irow][icol] & direction) continue;
        iluminated[irow][icol] |= direction;
        if (map[irow][icol] === '.'
            || (map[irow][icol] === '-' && (direction & Direction.Left || direction & Direction.Right))
            || (map[irow][icol] === '|' && (direction & Direction.Up || direction & Direction.Down))) {
            let [nextIrow, nextIcol] = nextPos(direction, irow, icol);
            beams.push([direction, nextIrow, nextIcol]);
        } else if (map[irow][icol] === '-' && (direction & Direction.Up || direction & Direction.Down)) {
            [irow, icol] = nextPos(Direction.Right, irow, icol);
            beams.push([Direction.Right, irow, icol]);
            [irow, icol] = nextPos(Direction.Left, irow, icol);
            beams.push([Direction.Left, irow, icol]);
        } else if (map[irow][icol] === '|' && (direction & Direction.Left || direction & Direction.Right)) {
            [irow, icol] = nextPos(Direction.Up, irow, icol);
            beams.push([Direction.Up, irow, icol]);
            [irow, icol] = nextPos(Direction.Down, irow, icol);
            beams.push([Direction.Down, irow, icol]);
        } else if (map[irow][icol] === '/') {
            switch (direction) {
                case Direction.Up:
                    direction = Direction.Right;
                    icol++;
                    break;
                case Direction.Down:
                    direction = Direction.Left;
                    icol--;
                    break;
                case Direction.Right:
                    direction = Direction.Up;
                    irow--;
                    break;
                case Direction.Left:
                    direction = Direction.Down;
                    irow++;
                    break;
            }
            beams.push([direction, irow, icol]);
        } else if (map[irow][icol] === '\\') {
            switch (direction) {
                case Direction.Down:
                    direction = Direction.Right;
                    icol++;
                    break;
                case Direction.Up:
                    direction = Direction.Left;
                    icol--;
                    break;
                case Direction.Left:
                    direction = Direction.Up;
                    irow--;
                    break;
                case Direction.Right:
                    direction = Direction.Down;
                    irow++;
                    break;
            }
            beams.push([direction, irow, icol]);
        }
    }
};

const totalEnergy = () =>
    iluminated.map(line => line.filter(cell => cell != 0).length).reduce((a, b) => a + b, 0);


iluminate(Direction.Right, 0, 0);

console.table(totalEnergy());
