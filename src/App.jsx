import { useState } from 'react';
import './App.css';

function createInitialBoard() {
  const squares = Array(64).fill(null);

  for (let i = 8; i <= 15; i++) {
    squares[i] = { type: 'pawn', color: 'black', hasMoved: false };
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
    squares[i] = { type: 'pawn', color: 'white', hasMoved: false };
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



function isValidKingMove(from, to, squares) {
  const fromRow = Math.floor(from / 8);
  const fromCol = from % 8;
  const toRow = Math.floor(to / 8);
  const toCol = to % 8;

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (
    rowDiff <= 1 &&
    colDiff <= 1 &&
    (rowDiff !== 0 || colDiff !== 0)
  ) {
    return true;
  }
  return false;
}

function isValidKnightMove(from, to){
  const fromRow = Math.floor(from / 8);
  const fromCol = from % 8;
  const toRow = Math.floor(to / 8);
  const toCol = to % 8;

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (
    rowDiff === 2 && colDiff === 1 ||
    colDiff === 2 && rowDiff === 1
  ){
    return true;
  }
  return false;
}

function isValidRookMove(from, to, squares) {
  const fromRow = Math.floor(from / 8);
  const fromCol = from % 8;
  const toRow = Math.floor(to / 8);
  const toCol = to % 8;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  if (
    !(fromRow === toRow || fromCol === toCol)
  ) {
    return false;
  }

  if (fromRow === toRow || fromCol === toCol){
    const rowStep = rowDiff > 0 ? 1 : -1;
    const colStep = colDiff > 0 ? 1 : -1;

    if (fromRow === toRow){
      let currentCol = fromCol + colStep;
      let currentRow = fromRow;
      while (currentCol !== toCol){
        const index = currentRow * 8 + currentCol;

        if (squares[index] !== null){
          return false;
        }

        currentCol += colStep;
      }
      return true;
    }

    if (fromCol === toCol){
      let currentCol = fromCol;
      let currentRow = fromRow + rowStep;

      while (currentRow !== toRow){
        const index = currentRow * 8 + currentCol;

        if (squares[index] !== null){
          return false;
        }

        currentRow += rowStep;
      }
      return true;
    }
  }
}

function isValidQueenMove(from, to, squares) {
  const fromRow = Math.floor(from / 8);
  const fromCol = from % 8;
  const toRow = Math.floor(to / 8);
  const toCol = to % 8;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  if (
    !(Math.abs(rowDiff) === Math.abs(colDiff)) &&
    !(fromRow === toRow || fromCol === toCol)
  ) {
    return false;
  }
  if (from === to){
    return false;
  }

  if (fromRow === toRow && fromCol !== toCol || fromRow !== toRow && fromCol === toCol){
    const rowStep = rowDiff > 0 ? 1 : -1;
    const colStep = colDiff > 0 ? 1 : -1;

    if (fromRow !== toRow){
      let currentRow = fromRow + rowStep;
      let currentCol = fromCol;

      while (currentRow !== toRow){
        const index = currentRow * 8 + currentCol;
        

        if (squares[index] !== null){
          return false;
        }

        currentRow += rowStep;
      }
      return true;
    }

    if (fromCol !== toCol){
      let currentRow = fromRow;
      let currentCol = fromCol + colStep;

      while (currentCol !== toCol){
        const index = currentRow * 8 + currentCol;
        

        if (squares[index] !== null){
          return false;
        }

        currentCol += colStep;
      }
      return true;
    }
  } else if (Math.abs(rowDiff) === Math.abs(colDiff)) {
    const rowStep = rowDiff > 0 ? 1 : -1;
    const colStep = colDiff > 0 ? 1 : -1;

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow && currentCol !== toCol) {
      const index = currentRow * 8 + currentCol;

      if (squares[index] !== null) {
        return false;
      }

      currentRow += rowStep;
      currentCol += colStep;
    }
    return true;
  } else {
    return false;
  }
}

function isValidBishopMove(from, to, squares){

  const fromRow = Math.floor(from / 8);
  const fromCol = from % 8;
  const toRow = Math.floor(to / 8);
  const toCol = to % 8;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  if (Math.abs(rowDiff) !== Math.abs(colDiff)) {
    return false;
  }

  const rowStep = rowDiff > 0 ? 1 : -1;
  const colStep = colDiff > 0 ? 1 : -1;

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow && currentCol !== toCol) {
    const index = currentRow * 8 + currentCol;

    if (squares[index] !== null) {
      return false;
    }

    currentRow += rowStep;
    currentCol += colStep;
  }
  return true;
}

function isValidPawnMove(from, to, piece, squares) {
  const direction = piece.color === 'white' ? -8 : 8;
  const moveDistance = to - from;
  const targetPiece = squares[to];

  if ((moveDistance === direction + 1 || moveDistance === direction - 1) && targetPiece !== null && targetPiece.color !== piece.color) {
    return true;
  }

  // Pawns cannot move into occupied squares straight ahead
  if (targetPiece !== null) {
    return false;
  }

  
  // First move: 1 or 2 spaces forward
  if (!piece.hasMoved) {
    if (moveDistance === direction) {
      return true;
    }

    if (moveDistance === direction * 2) {
      const middleSquare = from + direction;

      if (squares[middleSquare] === null) {
        return true;
      }
    }

    return false;
  }

  // After first move: only 1 space forward
  return moveDistance === direction;
}

function Board() {
  const [squares, setSquares] = useState(createInitialBoard());
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleSquareClick(i) {
  const toPiece = squares[i];

  if (selectedIndex === null) {
    if (toPiece) {
      setSelectedIndex(i);
    }
    return;
  }

  if (selectedIndex === i) {
    setSelectedIndex(null);
    return;
  }

  const from = selectedIndex;
  const to = i;
  const fromPiece = squares[from];

  if (toPiece && toPiece.color === fromPiece.color) {
    setSelectedIndex(i);
    return;
  }

  if (fromPiece.type === 'king'){
    const validKingMove = isValidKingMove(from, to, squares)

    if (!validKingMove){
      return;
    }
  }

  if (fromPiece.type === "knight") {
    const validKnightMove = isValidKnightMove(from, to, squares);

    if (!validKnightMove) {
      return;
    }
  }

  if (fromPiece.type === 'rook'){
    const validRookMove = isValidRookMove(from, to, squares);

    if (!validRookMove) {
      return;
    }
  }

  if (fromPiece.type === 'queen') {
    const validQueenMove = isValidQueenMove(from, to, squares);

    if (!validQueenMove){
      return;
    }
  }

  if (fromPiece.type === 'pawn') {
    const validPawnMove = isValidPawnMove(from, to, fromPiece, squares);

    if (!validPawnMove) {
      return;
    }
  }

  if (fromPiece.type === 'bishop') {
    const validBishopMove = isValidBishopMove(from, to, squares);

    if (!validBishopMove) {
      return
    }
  }

  const newSquares = squares.slice();
  const movedPiece =
    fromPiece.type === 'pawn'
      ? { ...fromPiece, hasMoved: true }
      : fromPiece;

  newSquares[to] = movedPiece;
  newSquares[from] = null;

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