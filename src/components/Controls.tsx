import { useGameStateAPI } from "../hooks"
import { GameStatus } from "../types";

export const Controls = () => {

    const gameStateAPI = useGameStateAPI();

    return (
        <div className="Controls">
            {gameStateAPI.status === GameStatus.IDLE && (
                <button onClick={gameStateAPI.startGame}>Start</button>
            )}
            {gameStateAPI.status === GameStatus.IN_PROGRESS && (
                <>
                    <p>Score: <span>{gameStateAPI.score}</span></p>
                    <button onClick={gameStateAPI.resetGame}>Restart</button>
                </>
            )}
            {gameStateAPI.status === GameStatus.LOST && (
                <>
                    <h3>Defeat</h3>
                    <p>Final Score: <span>{gameStateAPI.score}</span></p>
                    <button onClick={gameStateAPI.resetGame}>Play Again</button>
                </>
            )}
        </div>
    )
}