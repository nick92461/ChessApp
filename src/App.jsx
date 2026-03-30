import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Square({ value, isWhite, onClick }) {
  return (
    <button
      className={`square ${isWhite ? 'white' : 'black'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board(){
  const squares = Array(64).fill(null);
  return (
    <div className="board">
      {squares.map((value, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;

        // This is the key line for checker pattern
        const isWhite = (row + col) % 2 === 0;

        return (
          <Square
            key={i}
            value={value}
            isWhite={isWhite}
            onClick={() => console.log(i)}
          />
        );
      })}
    </div>
  );
}

export default function ChessGame() {
  return (
    <Board />
  )
}