//funciones que obtienen lo que hay guardado en el local storage: si no hay nada,
//la función devuelve el valor defaultValue (la variable de estado de App),
//así esta comprobación no la tenemos que hacer en App.

import type { Board, Turn, Winner } from '../types';

export const getBoardStorage = (key: string, defaultValue: Board): Board => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData === null) {
    return defaultValue;
  } else {
    return JSON.parse(localStorageData);
  }
};

export const getTurnStorage = (key: string, defaultValue: Turn): Turn => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData === null || (localStorageData !== 'x' && localStorageData !== 'o')) {
    return defaultValue;
  }
  return localStorageData;
};

export const getWinnerStorage = (key: string, defaultValue: Winner): Winner => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData === null) {
    return defaultValue;
  }
  if (localStorageData === 'x' || localStorageData === 'o' || localStorageData === '') {
    return localStorageData;
  } else {
    return JSON.parse(localStorageData);
  }
};

//funciones que guardan el nombre de un objeto (la key)
//y su valor en el local storage
export const setBoardStorage = (key: string, value: (string | null)[]): void => {
  const localStorageData = JSON.stringify(value);
  localStorage.setItem(key, localStorageData);
};

export const setTurnStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const setWinnerStorage = (key: string, value: string | null): void => {
  //si value es null, lo tenemos que pasar a string para guardarlo en local storage
  if (value === null) {
    const localStorageData = JSON.stringify(value);
    localStorage.setItem(key, localStorageData);
  } else {
    localStorage.setItem(key, value);
  }
};
