import { useRef, useState } from "react"

const InputQuestion = (props) => {
    const [questionDone, setQuestionDone] = useState()

    const questionInput = useRef(null)
    const marksInput = useRef(null)

    function handleChange(event) {
        let {name,value} = event.target

        if (name === 'marks') {
            value = (value || 1)
            value = Math.max(Math.min(value, 5), 1)
        }

        props.setNewQuestionInput(prevNewQuestionInput => {
            return {
                ...prevNewQuestionInput,
                [name === 'question' && 'value' || 'marks']: value
            }
        })
    }

    function handleQuestionBlur(event) {
        if (event.target.value === '') {
            props.setNewQuestionInput({
                'enabled': false,
                'marks': 0,
                'value': ''
            })
            return;
        }

        setQuestionDone(true)
    }

    return (
        <div className="input-question">
            <span>{props.questionNumber}</span>
            <input 
            name="question"
            ref={questionInput}
            type="text" 
            autoFocus 
            placeholder="Enter a question, e.g. What is the function of the mitochondria?" 
            onChange={handleChange} 
            value={props.value}
            onBlur={handleQuestionBlur}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    questionInput.current.blur()
                }
            }} />
            {questionDone && <input 
            ref={marksInput}
            value={props.marks} 
            autoFocus 
            name="marks"
            onChange={handleChange}
            onBlur={props.addQuestion} 
            className="marks" 
            type="number"
            min="1"
            max="5"
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    marksInput.current.blur()
                }
            }} 
            placeholder="How many marks will this question have?" />}
        </div>
    )
}

export default InputQuestion