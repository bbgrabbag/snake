import { useContext } from "react";
import { GameStateContext } from "./components/GameStateProvider";

export const useGameStateAPI = () => useContext(GameStateContext);