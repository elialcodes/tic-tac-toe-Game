//función que obtiene el local storage
//si no hay nada, la función devuelve el valor defaultValue
//(la variable de estado de App), así esta comprobación
//no la tenemos que hacer en App.js
export const get = (key, defaultValue) => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData === null) {
    return defaultValue;
  } else {
    return JSON.parse(localStorageData);
  }
};

//función que guarda el nombre de un objeto (la key)
//y su valor en el local storage
export const set = (key, value) => {
  const localStorageData = JSON.stringify(value);
  localStorage.setItem(key, localStorageData);
};