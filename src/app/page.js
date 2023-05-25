'use client'

import styles from './page.module.css'
import { weightedShuffle, questions } from '../constants/questions'
import { useEffect, useState, useCallback } from 'react'
import { nanoid } from 'nanoid'

const pendingQuestions = {}

const nextButtonClick = (setCurrentQuestion, currentPlayerIndex, setCurrentPlayerIndex, players, setSkips) => {
  const playerIndex = ((currentPlayerIndex + 1) % players.length)
  setCurrentPlayerIndex(playerIndex)

  if (!!pendingQuestions && playerIndex >= 0) {
    const questionsForPlayer = pendingQuestions[players[playerIndex].id]
    if (!!questionsForPlayer) {
      setCurrentQuestion(questionsForPlayer[0])

      setSkips(skips => { 
        skips[players[playerIndex].id] = (skips[players[playerIndex].id] || 0.0) + 1/5
        return skips 
      })
      pendingQuestions[players[playerIndex].id].shift()
    }
  }
}

export default function Home({ players = [{
  id: 1,
  name: 'Sarath'
}, {
  id: 2,
  name: 'P2'
}]}) {
  const [numberOfQuestions, setNumberOfQuestions] = useState(100)
  const [currentQuestion, setCurrentQuestion] = useState([])
  // const [players, setPlayers] = useState([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1)
  const [skips, setSkips] = useState({})



  useEffect(() => {
    if (!!players && players.length > 0) {
      const questionsPerPlayer = Math.floor(numberOfQuestions / players.length)
      players.forEach(player => {
        pendingQuestions[player.id] = weightedShuffle(questions, questionsPerPlayer)
      })
      
      nextButtonClick(setCurrentQuestion, currentPlayerIndex, setCurrentPlayerIndex, players, setSkips)
    }
  }, [])




  return (
    <main className={styles.main}>
      <div className={styles.description} onClick={() => nextButtonClick(
          setCurrentQuestion, currentPlayerIndex, setCurrentPlayerIndex, players, setSkips)}>
        {currentQuestion?.question || 'loading'}

        {/* <button className={styles.button} 
        onClick={() => nextButtonClick(
          setCurrentQuestion, currentPlayerIndex, setCurrentPlayerIndex, players, setSkips)}>
          Next
        </button> */}
      </div>
    </main>
  )
}
