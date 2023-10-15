import { useState, useEffect, useRef } from "react"
import { useDeckContext } from "../hooks/useDeckContext.js"

const NewDeck = ({ deckName, setDeckName}) => {
    const { state: decks, dispatch } = useDeckContext()
    const [ error, setError ] = useState('')
    const newDeckInput = useRef(null)

    function handleClick() {
        let found = false;

        for (let index in decks) {
            if (decks[index].name === deckName) {
                found = true
                break
            }
        }

        if (!found) {
            setError('')
            dispatch({
                type: 'ADD',
                payload: {
                    name: deckName,
                    questions: []
                }
            })
            setDeckName('')
        } else {
            setError('Deck already exists!')
        }
    }

    return (
        <div className="new-deck-form">
            <input className="new-deck-input" type="text" ref={newDeckInput} onKeyDown={e => {
                if (e.key === 'Enter') {
                    newDeckInput.current.blur()
                    handleClick()
                }
            }} value={deckName} onChange={event => setDeckName(event.target.value)} placeholder="Enter the name of your deck" />
            <button className="new-deck-add" onClick={handleClick}>Add</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default NewDeck