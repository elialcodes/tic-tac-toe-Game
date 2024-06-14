import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  getBoardStorage,
  getTurnStorage,
  getWinnerStorage,
  setBoardStorage,
  setTurnStorage,
  setWinnerStorage,
} from './services/localStorage';
import Square from './components/Square';
import WinnerModal from './components/WinnerModal';
import { CELLS, TURNS, WINNERCOMBOS } from './constants';
import type { Board, Turn, Winner } from './types';

function App(): JSX.Element {
  //ESTADOS (siempre en el cuerpo del componente, nunca dentro de if, un loop...etc):

  //variable del tablero: tomaremos primero lo que haya en localStorage,
  //si no, tomaremos el valor por defecto CELLS
  const [board, setBoard] = useState<Board>(() => {
    const savedBoard = getBoardStorage('savedBoard', CELLS);
    return savedBoard;
  });

  //variable para establecer turno: tomaremos primero lo que haya en localStorage,
  //si no, tomaremos el valor por defecto "x"
  const [turn, setTurn] = useState<Turn>(() => {
    const savedTurn = getTurnStorage('savedTurn', 'x');
    return savedTurn;
  });

  //variable para establecer el ganador: tomaremos primero lo que haya en localStorage,
  //si no, tomaremos el valor pr defecto null
  const [winner, setWinner] = useState<Winner>(() => {
    const savedWinner = getWinnerStorage('savedWinner', null);
    return savedWinner;
  });

  //UseEffect para guardar los datos en el local storage,
  //se ejecutará cuando cambie el array de dependencias "board", "turn", "winner"
  useEffect(() => {
    setBoardStorage('savedBoard', board);
  }, [board]);

  useEffect(() => {
    setTurnStorage('savedTurn', turn);
  }, [turn]);

  useEffect(() => {
    setWinnerStorage('savedWinner', winner);
  }, [winner]);

  //FUNCIONES DEL JUEGO:
  //función para ver si existe combinación ganadora:
  const checkWinner = (arrayCells: Board): Winner => {
    for (const combo of WINNERCOMBOS) {
      const [a, b, c] = combo; //en cada combo sacamos 3 constantes: a, b, c
      if (
        arrayCells[a] !== null &&
        arrayCells[a] === arrayCells[b] &&
        arrayCells[a] === arrayCells[c]
      ) {
        return arrayCells[a]; //devolvera como ganador el valor de esa celda: X o O
      }
    }
    return null; //si no hay combinación ganadora
  };

  //función para ver si hay un empate, comprobamos que todas las celdas estén
  //rellenas con valor distinto de null
  const checkEndGame = (arrayCells: Board): boolean => {
    return arrayCells.every((cell) => cell !== null); //devuelve true o false
  };

  //función para ir actualizando el tablero con cada click del usuario:
  const updateBoard = (index: number): void => {
    //1. tratamos la variable board:
    //nuevo array con la variable de estado (es importante meterlo en otro array para no alterar el estado)
    const newBoard: Board = [...board];
    //si newBoard[index] es truthy (ya tiene valor y no es null) return para no sobreescribir con X o O
    //si winner es truthy (ya tiene valor y no es null), significa que alguien ha ganado, asi que return
    if (newBoard[index] || winner) {
      return;
    }
    //elemento del nuevo array que era null y pasará a tener el valor que tenga turn en ese momento:
    newBoard[index] = turn;
    setBoard(newBoard); //vamos actualizando el array de celdas del tablero

    //2. tratamos la variable turn:
    //con un ternario le decimos que vaya alternando de valor, si es x que sea o y al revés
    const newTurn = turn === 'x' ? 'o' : 'x';
    setTurn(newTurn);

    //3. comprobamos si hay combinación ganadora o empate según la actualización del nuevo tablero:
    //metemos la función en una variable para ver si da true o false:
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti(); //si newWinner es true se lanza el confetti
      setWinner(newWinner); //si newWinner es true, el ganador se setea con X o O
      //si checkEndGame devuelve true tras comprobar si todas las celdas tienen un valor
      //distinto a null hay un empate:
    } else if (checkEndGame(newBoard)) {
      setWinner(''); // el ganador se setea con "", porque no existe
    }
  };

  //función volver a jugar, seteamos los estados:
  const handleReset = (): void => {
    setBoard(Array(9).fill(null));
    setTurn('x');
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={handleReset}>Reset</button>
      <section className="game">
        {board.map((_: string | null, index: number) => {
          // poner _ es una convención para indicar que esa variable no se va a utilizar,
          // en este caso indica el valor actual del elemento del array,
          // que en map es obligatorio indicarlo, y pintamos lo siguiente:
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {/* cada componente Square tiene dentro children, lo que nos ayuda a
              personalizarlos, aquí será el valor del array board en esa posición */}
              {board[index]?.toUpperCase()}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        {/* aquí square tiene como children el valor de la variable TURNS */}
        <Square isSelected={turn === 'x'}>X</Square>
        <Square isSelected={turn === 'o'}>O</Square>
      </section>
      <WinnerModal handleReset={handleReset} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
