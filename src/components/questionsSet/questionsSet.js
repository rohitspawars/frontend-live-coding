import React, { useState, useEffect } from "react";
import { QUESTIONS } from "../../questions";

function QuestionsSet() {
    const [selectedValues, setSelectedValues] = useState({});
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
    const [correctValues, setCorrectValues] = useState(0);
    const [result, setResult] = useState(false);
    const [overallResult, setOverallResult] = useState(0);

    useEffect(() => {
        // Check if all questions are answered
        const answeredQuestions = Object.values(selectedValues);
        const allAnswered = answeredQuestions.length === Object.keys(QUESTIONS).length &&
            answeredQuestions.every(value => value === "YES" || value === "NO");
        setAllQuestionsAnswered(allAnswered);
    }, [selectedValues]);
    useEffect(() => {
        const storedNumbers = JSON.parse(localStorage.getItem("numbers"));
        if (!storedNumbers) {
            localStorage.setItem("numbers", JSON.stringify([]));
        } else {
            const sum = storedNumbers.reduce((acc, curr) => acc + curr, 0);

            const average = sum / storedNumbers.length;
            setOverallResult(average)
        }


    }, []);

    const handleRadioChange = (questionId, value) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [questionId]: value
        }));
    };

    const handleSubmit = () => {
        const count = Object.values(selectedValues).filter(value => value === "YES").length;
        const formula = (100 * count) / 5;

        const existingArray = JSON.parse(localStorage.getItem('numbers')) || [];
        existingArray.push(formula);
        localStorage.setItem('numbers', JSON.stringify(existingArray));

        setCorrectValues(formula);
        setResult(true);
    };


    return (
        <div className="main_container">
            <div className='inner_wrapper'>
                {!isNaN (overallResult) && <div className='average_result'>Average Result based on last results: {Math.round(overallResult)}</div>}
                {!result ? (
                    <>
                        {Object.keys(QUESTIONS).map(key => (
                            <div className='question_row' key={key}>
                                {QUESTIONS[key]}
                                <div>
                                    <input type="radio" id={`yes_${key}`} name={`question_${key}`} value="YES" onChange={() => handleRadioChange(key, "YES")} />
                                    <label htmlFor={`yes_${key}`}>Yes</label>
                                </div>
                                <div>
                                    <input type="radio" id={`no_${key}`} name={`question_${key}`} value="NO" onChange={() => handleRadioChange(key, "NO")} />
                                    <label htmlFor={`no_${key}`}>No</label>
                                </div>
                            </div>

                        ))}
                        <div className='submit_btn'>
                            <button className='button' onClick={handleSubmit} disabled={!allQuestionsAnswered}>Submit</button>
                        </div>
                    </>

                ) : (
                    <>
                        <div className='result'>
                           <span>Your Score is: </span> {correctValues}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default QuestionsSet;


