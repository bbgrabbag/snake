
export type CellCoordinates = [number, number];
export enum CellMode {
    EMPTY = 'EMPTY'
}

export interface CellConfig {
    mode: CellMode;
    coordinates: CellCoordinates;
}

export enum Direction {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN',
}

export type Snake = CellCoordinates[];

export enum GameStatus {
    LOST = 'LOST',
    WON = 'WON',
    IN_PROGRESS = 'IN_PROGRESS',
    IDLE = 'IDLE'
}

export interface GameStateAPI {
    size: number
    fruitLocation: CellCoordinates;
    direction: Direction;
    snake: Snake;
    status: GameStatus;
    score: number;
    addPoint: () => void;
    startGame: () => void;
    resetGame: () => void;
}