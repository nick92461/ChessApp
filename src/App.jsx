import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
function Piece({ type, color}) {
  const src = `/assets/${color}_${type}.png`;

  return (
    <img
      src={src}
      alt={`${color} ${type}`}
      className="piece"
    />
  );
}

function Square({ piece, value, isWhite, onClick }) {
  return (
    <button
      className={`square ${isWhite ? 'white' : 'black'}`}
      onClick={onClick}
    >
      {piece && <Piece type={piece.type} color={piece.color} />}
    </button>
  );
}

function Board(){
  const squares = Array(64).fill(null);

  // Black pawns
  for (let i = 8; i <= 15; i++) {
    squares[i] = { type: 'pawn', color: 'black' };
  }

  // White pawns
  for (let i = 48; i <= 55; i++) {
    squares[i] = { type: 'pawn', color: 'white' };
  }
  return (
    <div className="board">
      {squares.map((piece, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;

        // This is the key line for checker pattern
        const isWhite = (row + col) % 2 === 0;

        return (
          <Square
            key={i}
            piece={piece}
            isWhite={isWhite}
            onClick={() => console.log(i, piece)}
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