import { PropsWithChildren, useCallback } from "react";
import { useGameStateAPI } from "../hooks";
import { areCoordinatesInList, doCoordinatesMatch } from "../helpers";
import { FRUIT_EMOJI_CODE } from "../constants";

export const CellUI: React.FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {

    return (
        <div className="Cell">
            {children}
        </div>
    )
}

interface CellProps {
    coordinates: [number, number];
}

export const Cell: React.FC<CellProps> = ({ coordinates }) => {
    const gameStateAPI = useGameStateAPI();
    const renderCellContent = useCallback(() => {
        switch (true) {
            case doCoordinatesMatch(coordinates, gameStateAPI.fruitLocation):
                return String.fromCodePoint(FRUIT_EMOJI_CODE)
            case areCoordinatesInList(coordinates, gameStateAPI.snake):
                return <div className="SnakeSegment"></div>
            default:
                return null;
        }
    }, [gameStateAPI])
    return (
        <CellUI>
            {renderCellContent()}
        </CellUI>
    )
}