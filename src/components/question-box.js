import { questions } from '@/constants/questions'
import React from 'react'

const QuestionBox = ({ currentQuestion }) => {
  return (
    <div>
      {currentQuestion.question}
      {currentQuestion.tags}
    </div>
  )
}

export default QuestionBox