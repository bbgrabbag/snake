import { CellCoordinates, Direction, Snake } from "./types"

export const getRandomCoordinate = (gridSize: number): CellCoordinates => {
    return [null, null].map(() => Math.floor(Math.random() * gridSize)) as CellCoordinates
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
    // check if snake ate itself
    // check if head is beyond edge
    if (areCoordinatesInList(snake[0], snake.slice(4))) return false;
    if (isCoordBeyondEdge(snake[0], size)) return false;

    return true;
}

// export const isCoordValid = (coords) => { }