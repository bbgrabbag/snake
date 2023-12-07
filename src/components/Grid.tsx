import { useCallback } from "react";
import { Cell } from "./Cell";
import { useGameStateAPI } from "../hooks";


interface GridUIProps {
    size: number;
}

export const GridUI: React.FC<GridUIProps> = ({ size }) => {

    const renderCells = useCallback(() => {
        return Array(size).fill(null).map((_, r) => (
            Array(size).fill(null).map((_, c) => (
                <Cell key={`[${r},${c}]`} coordinates={[r, c]} />
            ))
        ))
    }, [size]);

    return (
        <div className="Grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {renderCells()}
        </div>
    )
}

export const Grid = () => {

    const gameStateAPI = useGameStateAPI();

    return <GridUI size={gameStateAPI.size} />
}
