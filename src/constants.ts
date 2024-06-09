//VARIABLES:

//un array de 9 elementos y pedimos que llene todos los elementos con null
export const cells: null | string[] = Array(9).fill(null);

export const turns: { x: string; o: string } = {
  x: 'X',
  o: 'O',
};

export const winnerCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
