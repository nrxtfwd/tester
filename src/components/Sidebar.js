import { useState } from "react"

// components
import NewDeck from './NewDeck'
import Deck from './Deck'
import { useDeckContext } from "../hooks/useDeckContext"

const Sidebar = (props) => {
    const [ deckName, setDeckName ] = useState('')
    const { state } = useDeckContext()

    return (
        <div className="sidebar">
            <h1 className="title">Tester</h1>
            <NewDeck deckName={deckName} setDeckName={setDeckName} decks={props.decks} />
            {state.map((e, i) => <Deck id={i} deckName={e.name} {...props}/>)}
        </div>
    )
}

export default Sidebar