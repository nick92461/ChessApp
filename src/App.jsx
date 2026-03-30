import { useState } from 'react';
import './App.css';

function createInitialBoard() {
  const squares = Array(64).fill(null);

  for (let i = 8; i <= 15; i++) {
    squares[i] = { type: 'pawn', color: 'black' };
  }

  squares[0] = { type: 'rook', color: 'black' };
  squares[7] = { type: 'rook', color: 'black' };

  squares[1] = { type: 'knight', color: 'black' };
  squares[6] = { type: 'knight', color: 'black' };

  squares[2] = { type: 'bishop', color: 'black' };
  squares[5] = { type: 'bishop', color: 'black' };

  squares[3] = { type: 'queen', color: 'black' };
  squares[4] = { type: 'king', color: 'black' };

  for (let i = 48; i <= 55; i++) {
    squares[i] = { type: 'pawn', color: 'white' };
  }

  squares[56] = { type: 'rook', color: 'white' };
  squares[63] = { type: 'rook', color: 'white' };

  squares[57] = { type: 'knight', color: 'white' };
  squares[62] = { type: 'knight', color: 'white' };

  squares[58] = { type: 'bishop', color: 'white' };
  squares[61] = { type: 'bishop', color: 'white' };

  squares[59] = { type: 'queen', color: 'white' };
  squares[60] = { type: 'king', color: 'white' };

  return squares;
}

function Piece({ type, color }) {
  const src = `/assets/${color}_${type}.png`;

  return (
    <img
      src={src}
      alt={`${color} ${type}`}
      className="piece"
    />
  );
}

function Square({ piece, isWhite, isSelected, onClick }) {
  return (
    <button
      className={`square ${isWhite ? 'white' : 'black'} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {piece && <Piece type={piece.type} color={piece.color} />}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(createInitialBoard());
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleSquareClick(i) {
    const clickedPiece = squares[i];

    if (selectedIndex === null) {
      if (clickedPiece) {
        setSelectedIndex(i);
      }
      return;
    }

    if (selectedIndex === i) {
      setSelectedIndex(null);
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = newSquares[selectedIndex];
    newSquares[selectedIndex] = null;

    setSquares(newSquares);
    setSelectedIndex(null);
  }

  return (
    <div className="board">
      {squares.map((piece, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const isWhite = (row + col) % 2 === 0;

        return (
          <Square
            key={i}
            piece={piece}
            isWhite={isWhite}
            isSelected={selectedIndex === i}
            onClick={() => handleSquareClick(i)}
          />
        );
      })}
    </div>
  );
}

export default function ChessGame() {
  return <Board />;
}









/*Row 0:   0   1   2   3   4   5   6   7
  Row 1:   8   9  10  11  12  13  14  15
  Row 2:  16  17  18  19  20  21  22  23
  Row 3:  24  25  26  27  28  29  30  31
  Row 4:  32  33  34  35  36  37  38  39
  Row 5:  40  41  42  43  44  45  46  47
  Row 6:  48  49  50  51  52  53  54  55
  Row 7:  56  57  58  59  60  61  62  63 */