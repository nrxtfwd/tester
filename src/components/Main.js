import { useState } from "react"

// components
import Study from './Study'
import Configure from './Configure'

const Main = ({ selectedDeck }) => {
    const [tab, setTab] = useState('configure')

    const tabProps = {
        selectedDeck, setTab
    }

    return (
        <div className="main">
            {selectedDeck && ((tab === 'study' && <Study {...tabProps} />) || <Configure {...tabProps} />) || <p className="no-decks-selected">No decks selected! Create one or select one to start your learning journey.</p>}
        </div>
    )
}

export default Main