import { ReactNode } from 'react';

interface SquareProps {
  children: ReactNode;
  index?: number;
  isSelected?: boolean;
  updateGame?: (index: number) => void;
}

function Square({ children, index, isSelected = false, updateGame }: SquareProps): JSX.Element {
  const handleClick = () => {
    if (updateGame && index !== undefined) {
      updateGame(index);
    }
  };

  return (
    //añadimos 2 clases: square e isSelected en condicional
    <div className={`square ${isSelected ? 'is-selected' : ''}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export default Square;
