'use client'

import React, { useState } from 'react'
import QuestionBox from './question-box'
import NextButton from './next-button'

const QuestionBoxContainer = ({ questions }) => {
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0)

  return (
    <>
        <NextButton currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} />
        <QuestionBox currentQuestion={questions[currentQuestionIndex]} />
    </>
  )
}

export default QuestionBoxContainer