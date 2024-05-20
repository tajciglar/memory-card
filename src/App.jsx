
import Cards from './components/Cards'
import './App.css'
import StartScreen from './components/StartScreen'
import { useState } from 'react'

function App() {

    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
      setGameStarted(true);
    }

    return (
      <>
        {!gameStarted ? (
          <StartScreen startGame={startGame}></StartScreen>
        ) : (
          <Cards></Cards>)
  
        }
      </>
    )
}

export default App
