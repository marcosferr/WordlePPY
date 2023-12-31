let intentos = 6;
let diccionario = ["HURLS", "APPLE", "WINGS", "YOUTH"];
let url = "https://random-word-api.herokuapp.com/word?length=5&lang=es";

const selectIdioma = document.getElementById("select-idioma");
selectIdioma.addEventListener("change", () => {
  url = `https://random-word-api.herokuapp.com/word?length=5${selectIdioma.value}`;
  init();
});

let palabra = "";
const options = {
  method: "GET",
};
async function getWord() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [diccionario[Math.floor(Math.random() * diccionario.length)]];
  }
}
async function setWord() {
  try {
    const response = await getWord();
    palabra = response[0].toUpperCase();
    console.log(palabra);
  } catch (error) {
    console.error(error);
    palabra = "APPLE";
  }
}

//Declaramos constantes y variables
const BOTON = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;

//Creamos una grilla con la cantidad de intentos
function crearGrilla(intentos) {
  const GRID = document.getElementById("grid");
  GRID.innerHTML = "";
  for (let i = 0; i < intentos; i++) {
    const ROW = document.createElement("div");
    ROW.id = `row${i}`;
    for (let i = 0; i < 5; i++) {
      const SPAN = document.createElement("span");
      SPAN.className = "letter";
      ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
  }
}
// Declaramos funciones
function terminar(mensaje) {
  BOTON.removeEventListener("click", intentar);
  BOTON.addEventListener("click", init);
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;

  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}
function intentar() {
  const INTENTO = leerIntento();
  if (INTENTO === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
    BOTON.innerHTML = "Nuevo Juego";
    return;
  }

  //Generamos la grilla
  const GRID = document.getElementById("grid");
  const ROW = document.getElementById(`row${6 - intentos}`);
  ROW.innerHTML = "";
  ROW.className = "row";
  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#79b851";
    } else if (palabra.includes(INTENTO[i])) {
      //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#f3c237";
    } else {
      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#a4aec4";
    }
    ROW.appendChild(SPAN);
  }

  intentos--;
  if (intentos == 0) {
    BOTON.innerHTML = "Nuevo Juego";
    BOTON.addEventListener("click", init);
    terminar("<h1>PERDISTE!😖</h1>");
  }
}
function init() {
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = "";
  intentos = 6;
  input.disabled = false;
  input.value = "";
  BOTON.innerHTML = "Intentar";
  BOTON.removeEventListener("click", init);
  BOTON.addEventListener("click", intentar);
  setWord();
  crearGrilla(6);
}

//Agregamos listeners

window.addEventListener("load", init);
