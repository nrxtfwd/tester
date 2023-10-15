import { createContext, useEffect, useReducer } from "react";

export const DecksContext = createContext()

export const DeckReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                action.payload
            ]
        case 'REMOVE':
            return state.filter(e => e.name !== action.payload.name)
        case 'UPDATE':
            return [
                ...state.filter(e => e.name !== action.payload.name),
                action.payload
            ]
        case 'SET':
            return action.payload
        default:
            return state
    }
}

export const DecksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DeckReducer, [])

    useEffect(() => {
        const data = localStorage.getItem('decks')
    
        if (data) {
            dispatch({
                type: 'SET',
                payload: JSON.parse(data)
            })
        }
    }, [])

    useEffect(() => {
        function unload(event) {
          localStorage.setItem('decks', JSON.stringify(state))
        }
    
        window.addEventListener('beforeunload', unload)
    
        return function cleanup() {
            window.removeEventListener('beforeunload', unload)
        }
    }, [state])    

    return (
        <DecksContext.Provider value={{state, dispatch}}>
            {children}
        </DecksContext.Provider>
    )
}