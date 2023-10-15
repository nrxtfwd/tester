import { useDeckContext } from '../hooks/useDeckContext'
import { useState, useEffect } from 'react'

// components
import Question from './Question'
import InputQuestion from './InputQuestion'

const Configure = ({ selectedDeck, setTab }) => {
    const {state, dispatch} = useDeckContext()
    const [error, setError] = useState()

    const deck = state.filter(e => e.name === selectedDeck)[0]
    const disabledQuestionInput = {
        'enabled': false,
        'value': '',
        'questionNumber': 0,
        'marks': 1
    }

    const [newQuestionInput, setNewQuestionInput] = useState(disabledQuestionInput)

    function editQuestion(question, newQuestion) {
        const newQuestions = deck.questions
        for (let index in newQuestions) {
            const oldQuestion = newQuestions[index]
            if (oldQuestion.question === question) {
                newQuestions[index] = {
                    'question': newQuestion,
                    'marks': oldQuestion.marks
                }
                break
            }
        }

        dispatch({
            type: 'UPDATE',
            payload: {
                ...deck,
                questions: newQuestions
            }
        })
    }

    function deleteQuestion(question) {
        dispatch({
            type: 'UPDATE',
            payload: {
                ...deck,
                questions: deck.questions.filter(e => e.question !== question)
            }
        })
    }

    function addQuestion() {
        if (newQuestionInput.value === '') {
            setNewQuestionInput(disabledQuestionInput)
            return;
        }

        dispatch({
            type: 'UPDATE',
            payload: {
                ...deck,
                questions: [
                    ...deck.questions,
                    {
                        question: newQuestionInput.value,
                        marks: newQuestionInput.marks
                    }
                ]
            }
        })

        setNewQuestionInput(disabledQuestionInput)
    }

    function handleStudy() {
        if (deck.questions.length <= 0) {
            setError('You cannot study without questions?!')
            return;
        }

        setTab('study')
    }

    function handleNewQuestion() {
        if (newQuestionInput.enabled) return;

        console.log('new', newQuestionInput.enabled)

        if (error) {
            setError(null)
        }

        setNewQuestionInput({
            'enabled': true,
            'value': '',
            'questionNumber': deck.questions.length + 1
        })
    }

    useEffect(() => {
        function handleKeyPress(e) {
            if (e.keyCode === 13) {
                handleNewQuestion()
            }
        }

        document.addEventListener('keydown', handleKeyPress)

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [newQuestionInput])

    const questionInputProps = {
        setNewQuestionInput, addQuestion
    }

    const questionProps = {
        editQuestion, deleteQuestion
    }

    return (
        <div className="tab">
            <h1 className="deck-title">{deck.name}</h1>
            <div className="buttons">
                <button onClick={handleNewQuestion}>Add New Question</button>
                <button onClick={handleStudy}>Study</button>
            </div>
            {error && <p>{error}</p>}
            <div className="questions">
                {deck.questions.map((e,i) => {
                    console.log(e)
                    return <Question questionNumber={i+1} question={e.question} questionMarks={e.marks} {...questionProps} />
                })}
                {(deck.questions.length <= 0 && !newQuestionInput.enabled) && <p>No questions made yet! Make one now by pressing Enter.</p>}
                {newQuestionInput.enabled && <InputQuestion {...newQuestionInput} {...questionInputProps} />}
            </div>
        </div>
    )
}

export default Configure