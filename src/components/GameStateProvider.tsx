import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Direction, GameStateAPI, GameStatus, Snake } from "../types";
import { areCoordinatesInList, getEmptyCells, getNextSnakeCoords, getRandomCoordinate, validateSnakeCoords } from "../helpers";
import * as _ from 'lodash'

interface GameStateConfig {
    size: number;
    initialSnakeCoords: Snake;
    defaultDirection: Direction;
    speed: number
}

const useGameState = (config: GameStateConfig = {
    size: 15,
    initialSnakeCoords: [[14, 0], [15, 0], [16, 0], [17, 0], [18, 0]],
    defaultDirection: Direction.UP,
    speed: 128
}): GameStateAPI => {
    if (config.size < 15) throw Error(`Invalid grid size '${config.size}': must be 15 or higher`);

    const [snake, setSnake] = useState(config.initialSnakeCoords);
    const [fruitLocation, setFruitLocation] = useState(getRandomCoordinate(getEmptyCells(config.size, snake)));
    const [direction, setDirection] = useState(config.defaultDirection);
    const [status, setStatus] = useState(GameStatus.IDLE);
    const [score, setScore] = useState(0);

    const addPoint = useCallback(() => setScore(prev => prev + 1), [])

    const startGame = useCallback(() => {
        setStatus(GameStatus.IN_PROGRESS);
    }, [setStatus])

    const resetGame = useCallback(() => {
        setStatus(GameStatus.IDLE);
        setSnake(config.initialSnakeCoords)
        setDirection(config.defaultDirection);
        setFruitLocation(getRandomCoordinate(getEmptyCells(config.size, config.initialSnakeCoords)));
        setScore(0);
    }, [config, snake])

    useEffect(() => {
        let interval: number | undefined | void;
        if (!getEmptyCells(config.size, snake).length) {
            if (interval) interval = clearInterval(interval);
            setStatus(GameStatus.WON);
            return;
        }
        const startInterval = () => {
            interval = setInterval(() => {
                const nextSnakeCoords = getNextSnakeCoords(snake, direction, fruitLocation);
                const isValid = validateSnakeCoords(nextSnakeCoords, config.size);
                if (isValid) {
                    setSnake(nextSnakeCoords);
                    const ateFruit = areCoordinatesInList(fruitLocation, nextSnakeCoords);
                    if (ateFruit) {
                        setFruitLocation(getRandomCoordinate(getEmptyCells(config.size, snake)));
                        addPoint();
                    }
                } else {
                    if (interval) interval = clearInterval(interval);
                    setStatus(GameStatus.LOST);
                }
            }, config.speed)
        }
        if (!interval && status === GameStatus.IN_PROGRESS) {
            startInterval();
        }
        if (interval && status !== GameStatus.IN_PROGRESS) {
            interval = clearInterval(interval)
        }

        const handleArrowPress = _.throttle((e: KeyboardEvent) => {
            if (status !== GameStatus.IN_PROGRESS) return;
            switch (e.code) {
                case 'ArrowUp':
                    if ([Direction.DOWN, Direction.UP].includes(direction)) return;
                    setDirection(Direction.UP);
                    break;
                case 'ArrowDown':
                    if ([Direction.UP, Direction.DOWN].includes(direction)) return;
                    setDirection(Direction.DOWN);
                    break;
                case 'ArrowLeft':
                    if ([Direction.RIGHT, Direction.LEFT].includes(direction)) return;
                    setDirection(Direction.LEFT);
                    break;
                case 'ArrowRight':
                    if ([Direction.LEFT, Direction.RIGHT].includes(direction)) return;
                    setDirection(Direction.RIGHT);
                    break;
            }
            if (interval) interval = clearInterval(interval);
            startInterval();
        }, 10)
        window.addEventListener('keyup', handleArrowPress)
        return () => {
            handleArrowPress.cancel()
            window.removeEventListener('keyup', handleArrowPress)
            if (interval) interval = clearInterval(interval)
        }
    }, [config, status, direction, snake, fruitLocation]);

    return useMemo(() => ({
        size: config.size,
        fruitLocation,
        direction,
        snake,
        status,
        score,
        addPoint,
        startGame,
        resetGame
    }), [
        config,
        fruitLocation,
        direction,
        snake,
        status,
    ])
}

export const GameStateContext = createContext<GameStateAPI>({} as GameStateAPI);

export const GameStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const gameStateAPI = useGameState();
    return (
        <GameStateContext.Provider value={gameStateAPI}>
            {children}
        </GameStateContext.Provider>
    )
}