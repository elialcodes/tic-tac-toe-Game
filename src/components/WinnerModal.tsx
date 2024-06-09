import Square from './Square';

interface WinnerModalProps {
  winner: string | null;
  handleReset: () => void;
}

function WinnerModal({ winner, handleReset }: WinnerModalProps): JSX.Element {
  //no hay un ganador, nos salimos y no retornamos nada
  if (winner === null) {
    return null;
  }
  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === '' ? 'Empate' : `El ganador es: ${winner}`}</h2>
        <div className={winner === '' ? '' : 'win'}>{winner && <Square>{winner}</Square>}</div>
        <button onClick={handleReset}>Comenzar</button>
      </div>
    </section>
  );
}

export default WinnerModal;

//renderizado condicional, cuando no es ternario: condición y &&
