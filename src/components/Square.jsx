function Square({ children, index, isSelected, updateBoard }) {
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
