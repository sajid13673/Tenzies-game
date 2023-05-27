import React from "react"
import Die from "./components/die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){
  const [answer, setAnswer] = React.useState("");
      function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                "value":(Math.ceil(Math.random() * 6)),
                "isHeld":false,
                "id": nanoid()
            })
        }
        return newDice
    }

    const [dice, setDice] = React.useState(allNewDice())

    const diceElements = dice.map(die => <Die 
                                            value={die.value} 
                                            key={die.id} 
                                            isHeld={die.isHeld} 
                                            holdDice={()=>holdDice(die.id)}
                                            />)

    function rollDice(){
        if(!tenzies){
            setDice(prevDice=> prevDice.map(die=> {return die.isHeld ? die :{...die, value: (Math.ceil(Math.random() * 6)), id: nanoid()}}))
        }
        else{
            setTenzies(!tenzies)
            setDice(allNewDice())
        }
    }

    function holdDice(id){
        setDice(oldDice=> oldDice.map(die=> { return die.id === id ?{...die, isHeld: !die.isHeld}: die }))
    }

    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue){
            setTenzies(true)
            console.log("You won!")
        }
        console.log("Dice state changed")
    },[dice])
    React.useEffect(()=>{
      console.log("answered")
      },[answer])
  return(
    <main>
          {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-btn" onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
      </main>
  )
}
