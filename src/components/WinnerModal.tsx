import type { Winner } from '../types';
import Square from './Square';

interface WinnerModalProps {
  winner: Winner;
  handleReset: () => void;
}

function WinnerModal({ winner, handleReset }: WinnerModalProps): JSX.Element | null {
  //si todavía no hay un ganador, nos salimos y no se renderiza nada
  if (winner === null) {
    return null;
  }

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === '' ? 'Empate' : `El ganador es:`}</h2>
        <div className={winner === '' ? '' : 'win'}>{winner && <Square>{winner}</Square>}</div>
        <button onClick={handleReset}>Comenzar</button>
      </div>
    </section>
  );
}

export default WinnerModal;

//renderizado condicional, cuando no es ternario: condición y &&
