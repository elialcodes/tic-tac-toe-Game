import { useState } from 'react';
import Square from './Square';

function App() {
  //VARIABLES:
  const turns = {
    x: 'X',
    o: 'O',
  };

  const winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //ESTADOS:

  //un array de 9 elementos y pedimos que llene todos los elementos con null
  const [board, setBoard] = useState(Array(9).fill(null));

  //variable para establecer el turno
  const [turn, setTurn] = useState(turns.x);

  //variable para establecer el ganador
  const [winner, setWinner] = useState(null);

  //FUNCIONES DEL JUEGO:
  //función para ver si hay combinación ganadora:
  const checkWinner = (arrayCells) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo; //en cada combo sacamos 3 constantes: a, b, c
      if (arrayCells[a] && arrayCells[a] === arrayCells[b] && arrayCells[a] === arrayCells[c]) {
        return arrayCells[a]; //devolvera X o O
      }
    }
    return null; //si no hay combinación ganadora
  };

  //función para actualizar el tablero:
  const updateBoard = (index) => {
    //1. tratamos la variable board:
    //nuevo array con la variable de estado (es importante meterlo en otro array para no alterar el estado)
    const newBoard = [...board];
    //si newBoard[index] es truthy (ya tiene valor y no es null) return para no sobreescribir con X o O
    //si winner es truthy (ya tiene valor y no es null), significa que alguien ha ganado, asi que return
    if (newBoard[index] || winner) {
      return;
    }
    //elemento del nuevo array que era null y tendrá el valor que tenga turn en ese momento:
    newBoard[index] = turn;
    setBoard(newBoard); //vamos actualizando el array de celdas del tablero
    //2. tratamos la variable turn:
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn);
    //3. comprobamos si hay combinación ganadora según la actualización del nuevo tablero:
    const newWinner = checkWinner(newBoard); //metemos la función en una variable para ver si da true:
    if (newWinner) {
      setWinner(newWinner); //el ganador se establece con X o O
    }
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {/* cada componente Square tiene dentro children, lo que nos ayuda a
              personalizarlos, aquí será el valor del array board en esa posición */}
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        {/* aquí square tiene como children el valor de la variable turns */}
        <Square isSelected={turn === turns.x}>{turns.x}</Square>
        <Square isSelected={turn === turns.o}>{turns.o}</Square>
      </section>
      <section className="winner">
        <div className="text">
          <h2>{winner ? `El ganador es: ${winner}` : 'Empate'}</h2>
        </div>
      </section>
    </main>
  );
}

export default App;
