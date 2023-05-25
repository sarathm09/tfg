import React from 'react'

const NextButton = ({ setCurrentQuestionIndex }) => {
  return (
    <button onClick={() => setCurrentQuestionIndex(i => i + 1)}>Next</button>
  )
}

export default NextButton