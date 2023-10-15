// components
import FrontPage from './FrontPage'
import Page from './Page'
import { useDeckContext } from '../hooks/useDeckContext'

const Study = ({ selectedDeck, setTab }) => {
    const {state} = useDeckContext()
    const deck = state.filter(e => e.name === selectedDeck)[0]
    const questionsPerPage = []

    let pageNumber = 0;

    function handleClick() {
        setTab('configure')
    }

    let currentPair = []
    let pairTotal = 0
    for (let index in deck.questions) {
        const curQuestion = deck.questions[index]
        const curMarks = parseInt(curQuestion.marks)
        if ((curMarks + pairTotal) <= 15) {
            pairTotal += curMarks
            currentPair.push(curQuestion)
        } else {
            console.log(currentPair, pairTotal, curMarks)
            questionsPerPage.push(currentPair)
            currentPair = [curQuestion]
            pairTotal = curMarks
        }
    }

    questionsPerPage.push(currentPair)

    return (
        <div className="tab study">
            <button onClick={handleClick} className="back-button">Back</button>
            <FrontPage />
            {questionsPerPage.map(e => {
                pageNumber++
                return (<Page questions={e} pageNumber={pageNumber} />)
            })}
        </div>
    )
}

export default Study