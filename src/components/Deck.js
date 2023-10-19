const symbols = {
    'biology': 'biotech',
    'physics': 'rocket',
    'chemistry': 'science',
    'psychology': 'psychology',
    'mathematics': 'calculate'
}

const Deck = (props) => {
    const name = props.deckName;
    const lowercaseName = name.toLowerCase()

    return (
        <div onClick={() => props.setSelectedDeck(name)} className={`deck ${props.selectedDeck === name && 'selected-deck'}`}>
            <span className="material-symbols-outlined">{`${symbols[lowercaseName] || 'menu_book'}`}</span>
            <p>{name}</p>
        </div>
    )
}

export default Deck