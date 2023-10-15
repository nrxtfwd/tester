import { useRef, useState } from "react"

const Question = ({ questionNumber, question, deleteQuestion, editQuestion, questionMarks }) => {
    const [editing, setEditing] = useState()
    const editInput = useRef(null)

    function handleDelete() {
        deleteQuestion(question)
    }

    function handleEdit(newQuestion) {
        if (newQuestion === '') return;

        editQuestion(question, newQuestion)
    }

    return (
        <div className="question">
            <div className="body">
                <div className="question-number">
                    {questionNumber}
                </div>
                {(editing && 
                <input 
                ref={editInput}
                autoFocus 
                className="edit-input" 
                type='text' 
                placeholder={question}
                onBlur={e => {
                    setEditing(false)
                    handleEdit(e.target.value)
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        editInput.current.blur()
                    }
                }} />) || <p className="question-display"> {question} ({questionMarks})</p>}
            </div>
            <div className="controls">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setEditing(true)}>Edit</button>
            </div>
        </div>
    )
}

export default Question