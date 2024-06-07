import { useState } from 'react';
import Square from './components/Square';
import WinnerModal from './components/WinnerModal';
import { turns, winnerCombos } from './constants';
import confetti from 'canvas-confetti';

function App() {
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

  //función para ver si hay un empate, comprobamos que todas las celdas tengan valor distinto de null
  const checkEndGame = (arrayCells) => {
    return arrayCells.every((cell) => cell !== null);
  };

  //función para ir actualizando el tablero con cada click del usuario:
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
    //3. comprobamos si hay combinación ganadora o empate según la actualización del nuevo tablero:
    const newWinner = checkWinner(newBoard); //metemos la función en una variable para ver si da true o false:
    if (newWinner) {
      confetti();
      setWinner(newWinner); //el ganador se setea con X o O
    } else if (checkEndGame(newBoard)) {
      // con cada click vamos comprobamos que si las celdas tienen un valor distinto a null
      setWinner(false); // el ganador se setea con false
    }
  };

  //función volver a jugar, seteamos los estados:
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.x);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={handleReset}>Reset</button>
      <section className="game">
        {board.map((_, index) => {
          // poner _ es una convención para indicar que esa variable no se va a utilizar,
          // en este caso indica el valor actual del elemento del array,
          // que en map es obligatorio indicarlo
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
      <WinnerModal handleReset={handleReset} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
