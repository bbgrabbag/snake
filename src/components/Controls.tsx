import { useGameStateAPI } from "../hooks"
import { GameStatus } from "../types";

export const Controls = () => {

    const gameStateAPI = useGameStateAPI();

    return (
        <div className="Controls">
            {gameStateAPI.status === GameStatus.IDLE && (
                <>
                    <p>Use keyboard &#8592; &#8594; &#8593; &#x2193; arrows to play</p>
                    <button onClick={gameStateAPI.startGame}>Start</button>
                </>
            )}
            {gameStateAPI.status === GameStatus.IN_PROGRESS && (
                <>
                    <p>Score: <span>{gameStateAPI.score}</span></p>
                    <button onClick={gameStateAPI.resetGame}>Restart</button>
                </>
            )}
            {gameStateAPI.status === GameStatus.LOST && (
                <>
                    <h3>Defeat!</h3>
                    <p>Final Score: <span>{gameStateAPI.score}</span></p>
                    <button onClick={gameStateAPI.resetGame}>Try Again</button>
                </>
            )}
            {gameStateAPI.status === GameStatus.WON && (
                <>
                    <h3>Victory!</h3>
                    <p>Final Score: <span>{gameStateAPI.score}</span></p>
                    <button onClick={gameStateAPI.resetGame}>Play Again</button>
                </>
            )}
        </div>
    )
}