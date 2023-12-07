import { CellCoordinates, Direction, Snake } from "./types"

export const getRandomCoordinate = (options: CellCoordinates[]): CellCoordinates => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

export const doCoordinatesMatch = (coord1: CellCoordinates, coord2: CellCoordinates) => {
    return coord1.every((x, i) => x === coord2[i])
}

export const areCoordinatesInList = (coords: CellCoordinates, coordList: CellCoordinates[]) => {
    return !!coordList.find(coordsOption => doCoordinatesMatch(coords, coordsOption))
}

export const isCoordBeyondEdge = (coords: CellCoordinates, size: number): boolean => {
    const [row, col] = coords;
    return row < 0 || col < 0 || row >= size || col >= size
}

export const getEmptyCells = (size: number, snake: Snake) => {
    return Array(Math.pow(size, 2)).fill(null).reduce((output, _, i) => {
        const coords: CellCoordinates = [Math.floor(i / size), i % size];
        if (areCoordinatesInList(coords, snake)) return output;
        return [coords, ...output]
    }, [])
}

export const getNextSnakeCoords = (snake: Snake, direction: Direction, fruitLocation: CellCoordinates): Snake => {
    const [[row, col]] = snake;
    const graph: Record<Direction, CellCoordinates> = {
        [Direction.UP]: [row - 1, col],
        [Direction.DOWN]: [row + 1, col],
        [Direction.LEFT]: [row, col - 1],
        [Direction.RIGHT]: [row, col + 1],
    }
    const eatFruit = doCoordinatesMatch(graph[direction], fruitLocation);
    return [graph[direction], ...snake.slice(0, snake.length - (eatFruit ? 0 : 1))]
}

export const validateSnakeCoords = (snake: Snake, size: number): boolean => {
    if (areCoordinatesInList(snake[0], snake.slice(4))) return false;
    if (isCoordBeyondEdge(snake[0], size)) return false;
    return true;
}
