const Deck = (props) => {
    const name = props.deckName;

    return (
        <div onClick={() => props.setSelectedDeck(name)} 
        style={{'backgroundColor': `${(props.selectedDeck === name && 'rgba(255,255,255,0.5)') || 'rgba(0,0,0,0)'}`}} className="deck">
            <p>{name}</p>
        </div>
    )
}

export default Deck