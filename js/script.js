// Seleccionamos los elementos del DOM
const fetchJokeButton = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

// Función para obtener un chiste de la API
async function fetchJoke() {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    return data.value; // Devuelve solo el texto del chiste
  } catch (error) {
    console.error("Error al obtener el chiste:", error);
    return null;
  }
}

// Función para renderizar los chistes en el DOM
function renderJokes() {
  jokeList.innerHTML = ""; // Limpiamos la lista
  const jokes = JSON.parse(localStorage.getItem("jokes")) || []; // Obtenemos los chistes del LocalStorage

  jokes.forEach((joke, index) => {
    // Crear elementos del DOM
    const jokeItem = document.createElement("li");
    jokeItem.textContent = joke;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";

    // Añadimos evento al botón para eliminar el chiste
    deleteButton.addEventListener("click", () => {
      deleteJoke(index);
    });

    // Añadimos elementos al DOM
    jokeItem.appendChild(deleteButton);
    jokeList.appendChild(jokeItem);
  });
}

// Función para guardar los chistes en LocalStorage
function saveJokes(jokes) {
  localStorage.setItem("jokes", JSON.stringify(jokes));
}

// Función para añadir un nuevo chiste
async function addJoke() {
  const joke = await fetchJoke();
  if (joke) {
    const jokes = JSON.parse(localStorage.getItem("jokes")) || [];
    jokes.push(joke); // Añadimos el nuevo chiste
    saveJokes(jokes); // Guardamos en LocalStorage
    renderJokes(); // Actualizamos la lista en el DOM
  }
}

// Función para eliminar un chiste individual
function deleteJoke(index) {
  const jokes = JSON.parse(localStorage.getItem("jokes")) || [];
  jokes.splice(index, 1); // Eliminamos el chiste del array
  saveJokes(jokes); // Guardamos el cambio en LocalStorage
  renderJokes(); // Actualizamos la lista en el DOM
}

// Función para eliminar todos los chistes
function deleteAllJokes() {
  localStorage.removeItem("jokes"); // Eliminamos del LocalStorage
  renderJokes(); // Limpiamos la lista del DOM
}

// Evento para obtener un nuevo chiste
fetchJokeButton.addEventListener("click", addJoke);

// BONUS: Agregamos un botón para eliminar todos los chistes
const deleteAllButton = document.createElement("button");
deleteAllButton.textContent = "Eliminar Todos";
deleteAllButton.style.marginTop = "10px";
deleteAllButton.style.backgroundColor = "red";
deleteAllButton.style.color = "white";
deleteAllButton.addEventListener("click", deleteAllJokes);

// Añadimos el botón al DOM
document.body.appendChild(deleteAllButton);

// Cargamos los chistes almacenados al cargar la página
document.addEventListener("DOMContentLoaded", renderJokes);
