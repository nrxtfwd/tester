import { useContext } from "react";
import { DecksContext } from "../context/DecksContext";

export const useDeckContext = () => {
    const context = useContext(DecksContext)

    if (!context) {
        throw new Error('Context needs to be used within the provider!')
    }

    return context
}