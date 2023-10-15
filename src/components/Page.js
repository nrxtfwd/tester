const Page = ({ questions, pageNumber }) => {
    let questionIndex = 0

    return (
        <div className="page content-page">
            <p className="page-number">{pageNumber}</p>
            {questions.map(e => {
                const {question, marks: questionMarks} = e

                questionIndex++

                const answerLines = []
                for (let i = 0; i < questionMarks; i++) {
                    answerLines.push(<p className="answer-line">.................................................................................</p>)
                }

                return (
                    <div className="question-on-paper">
                        <p>{questionIndex}. {question} ({questionMarks}) </p>
                        {answerLines}
                    </div>
                )
            })}
        </div>
    )
}

export default Page