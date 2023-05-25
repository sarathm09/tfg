import React from 'react'
import { weightedShuffle, questions } from '../../constants/questions'
import QuestionBoxContainer from '@/components/question-box-container'

const TheFriendshipQuiz = () => {
    const questionsForSession = weightedShuffle(questions, 100)

  return (
    <div id="page">
        <div id="header">
            <div id="title">

            </div>
        </div>
        <div id="body">
            <div id="container">
                <div id="questionBoxContainer">
                    <QuestionBoxContainer questions={questionsForSession} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TheFriendshipQuiz