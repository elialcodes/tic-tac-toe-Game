import React, { ReactNode } from 'react';

interface SquareProps {
  children: ReactNode;
  index: number;
  isSelected: boolean;
  updateBoard: (index: number) => void;
}

function Square({ children, index, isSelected, updateBoard }: SquareProps): JSX.Element {
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    //añadimos 2 clases: square e isSelected en condicional
    <div className={`square ${isSelected ? 'is-selected' : ''}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export default Square;
