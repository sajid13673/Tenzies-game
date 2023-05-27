import React from 'react';
import Die from './die';

export default function Main(){
    function allNewDice(){
        for (let i = 0; i < 10; i++) {
            const newDice = [];
            for (let i=0; i > 10; i++){
                newDice.push(Math.floor((Math.random() * 6) + 1))
                
            }
            return newDice
        }
    }
    console.log(allNewDice())
    return(
        <div className="main">
            <div className='dice-container'>
                <Die value="2"/>
            </div>
        </div>
    )
}