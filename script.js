// =====================
// VARIABLES Y ESTADO
// =====================

const WORDS = [
  // Objetos y cosas cotidianas
  "Pizza","Computadora","Montaña","Playa","Cine","Auto","Perro","Viaje","Música","Café",
  "Teléfono","Libro","Avión","Tren","Barco","Casa","Puerta","Ventana","Silla","Mesa",
  "Zapato","Camisa","Sombrero","Reloj","Lámpara","Televisión","Radio","Celular","Teclado","Ratón",
  "Helado","Chocolate","Hamburguesa","Pan","Queso","Leche","Agua","Jugo","Cerveza","Vino",
  "Fútbol","Tenis","Basket","Natación","Ciclismo","Boxeo","Rugby","Golf","Esquí","Surf",

  // Países
  "Argentina","Brasil","Chile","Uruguay","Paraguay","Bolivia","Perú","México","Estados Unidos","Canadá",
  "España","Francia","Italia","Alemania","Reino Unido","China","Japón","Corea","India","Australia",
  "Sudáfrica","Egipto","Marruecos","Nigeria","Rusia","Ucrania","Suecia","Noruega","Finlandia","Dinamarca",

  // Películas internacionales
  "Titanic","Avatar","Inception","Matrix","Gladiator","Interstellar","The Godfather","Star Wars","Jurassic Park","Frozen",
  "Toy Story","Shrek","Harry Potter","The Dark Knight","Forrest Gump","Pulp Fiction","The Lion King","Finding Nemo","Up","Coco",

  // Cantantes internacionales
  "Michael Jackson","Madonna","Elton John","Freddie Mercury","Shakira","Rihanna","Beyoncé","Taylor Swift","Ed Sheeran","Adele",
  "Justin Bieber","Drake","Billie Eilish","Bruno Mars","Lady Gaga","Katy Perry","Coldplay","U2","The Beatles","Queen",

  // Famosos argentinos (deporte y entretenimiento)
  "Lionel Messi","Diego Maradona","Carlos Tévez","Juan Martín del Potro","Gabriela Sabatini","Ginóbili","Riquelme","Gallardo","Scaloni","Mascherano",
  "Ricardo Darín","Susana Giménez","Mirtha Legrand","Tinelli","Adrián Suar","Luisana Lopilato","China Suárez","Lali Espósito","Tini Stoessel","Abel Pintos",

  // Más random (lugares, conceptos, cosas divertidas)
  "Sol","Luna","Estrella","Planeta","Galaxia","Universo","Tiempo","Reloj","Historia","Futuro",
  "Amor","Amistad","Trabajo","Dinero","Sueño","Juego","Diversión","Fiesta","Baile","Canción",
  "Robot","Inteligencia Artificial","Programación","Código","Internet","Redes Sociales","Instagram","TikTok","YouTube","Netflix",
  "PlayStation","Xbox","Nintendo","Mario","Zelda","Pokémon","Minecraft","Fortnite","Counter Strike","League of Legends",
  "River","Boca","Independiente","Racing","San Lorenzo","Newells","Rosario Central","Estudiantes","Vélez","Huracán",

  // Profesiones 
  "Doctor","Enfermero","Maestro","Profesor","Ingeniero","Arquitecto","Abogado","Contador","Carpintero","Electricista",
  "Plomero","Panadero","Cocinero","Chef","Mecánico","Piloto","Azafata","Soldado","Policía","Bombero", "Actor","Cantante",
  "Bailarín","Escritor","Periodista","Fotógrafo","Diseñador","Programador","Analista","Astronauta", "Veterinario","Dentista",
  "Psicólogo","Farmacéutico","Economista","Minero","Agricultor","Ganadero","Pescador","Marinero", "Juez","Notario","Traductor",
  "Intérprete","Bibliotecario","Científico","Químico","Biólogo","Matemático","Historiador", "Geólogo","Sociólogo","Filósofo",
  "Político","Diplomático","Embajador","Consultor","Coach","Entrenador","Deportista",

  // Animales
  "Gato","León","Tigre","Elefante","Jirafa","Cebra","Caballo","Burro","Toro","Vaca", "Gallina","Pato","Ganso","Perico","Canario",
  "Águila","Cóndor","Halcón","Búho","Murciélago", "Delfín","Ballena","Tiburón","Pulpo","Calamar","Cangrejo","Langosta",
  "Estrella de mar","Caballito de mar","Medusa", "Perro","Lobo","Zorro","Oso","Panda","Koala","Canguro","Camello","Rinoceronte",
  "Hipopótamo", "Mono","Chimpancé","Gorila","Orangután","Lémur","Perezoso","Ardilla","Castor","Erizo","Topo", "Serpiente","Lagarto",
  "Iguana","Cocodrilo","Tortuga","Sapo","Rana","Salamandra","Escorpión","Araña", "Abeja","Avispa","Hormiga","Mariposa","Libélula",
  "Mosquito","Mosca","Grillo","Saltamontes","Escarabajo",
];


let players = [];
let impostorIndexes = [];
let secretWord = "";
let currentPlayerIndex = 0;
let totalPlayers = 0;
let totalImpostors = 0;

// =====================
// UTILIDADES
// =====================

function getRandomWord() {
  const index = Math.floor(Math.random() * WORDS.length);
  return WORDS[index];
}

function getRandomImpostors(total, count) {
  const result = [];
  while (result.length < count) {
    const rand = Math.floor(Math.random() * total);
    if (!result.includes(rand)) {
      result.push(rand);
    }
  }
  return result;
}

function showScreen(screenId) {
  document.querySelectorAll("div[id^='screen']").forEach(div => {
    div.style.display = "none";
    div.classList.remove("animate__animated", "animate__fadeIn");
  });

  const screen = document.getElementById(screenId);
  screen.style.display = "block";
  screen.classList.add("animate__animated", "animate__fadeIn");
}

// =====================
// NAVEGACIÓN
// =====================

document.getElementById("btnStart").addEventListener("click", () => {
  showScreen("screen-config");
});

// =====================
// CONFIGURACIÓN
// =====================

document.getElementById("btnConfigNext").addEventListener("click", () => {
  totalPlayers = parseInt(document.getElementById("playersCount").value);
  totalImpostors = parseInt(document.getElementById("impostorsCount").value);

  if (!totalPlayers || !totalImpostors) {
    alert("Completá todos los campos");
    return;
  }

  if (totalImpostors >= totalPlayers) {
    alert("Los impostores deben ser menos que los jugadores");
    return;
  }

  const container = document.getElementById("namesContainer");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.placeholder = `Jugador ${i + 1}`;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  showScreen("screen-names");
});

// =====================
// CREAR JUGADORES
// =====================

document.getElementById("btnNamesNext").addEventListener("click", () => {
  const inputs = document.querySelectorAll("#namesContainer input");

  players = [];
  inputs.forEach((input, index) => {
    players.push({
      name: input.value || `Jugador ${index + 1}`,
      role: "player"
    });
  });

  impostorIndexes = getRandomImpostors(players.length, totalImpostors);
  impostorIndexes.forEach(i => {
    players[i].role = "impostor";
  });

  secretWord = getRandomWord();
  currentPlayerIndex = 0;

  updateGameScreen();
  showScreen("screen-game");
});

// =====================
// JUEGO
// =====================

const wordBox = document.getElementById("wordBox");

function updateGameScreen() {
  const player = players[currentPlayerIndex];
  document.getElementById("currentPlayerName").textContent =
    `Turno de ${player.name}`;
  hideWord();
}

function revealWord() {
  const player = players[currentPlayerIndex];

  wordBox.classList.add("revealed");

  if (player.role === "impostor") {
    wordBox.innerHTML = `<span class="impostor">SOS EL IMPOSTOR</span>`;
  } else {
    wordBox.textContent = secretWord;
  }
}

function hideWord() {
  wordBox.classList.remove("revealed");
  wordBox.textContent = "Mantener presionado para ver";
}


// Eventos táctiles y mouse
wordBox.addEventListener("mousedown", revealWord);
wordBox.addEventListener("mouseup", hideWord);
wordBox.addEventListener("touchstart", revealWord);
wordBox.addEventListener("touchend", hideWord);

// =====================
// SIGUIENTE JUGADOR
// =====================

document.getElementById("btnNextPlayer").addEventListener("click", () => {
  currentPlayerIndex++;

  if (currentPlayerIndex >= players.length) {
    Swal.fire({
      title: "¡Listo!",
      text: "Todos ya tienen su palabra. Pasen el celu y a jugar 🕵️‍♂️",
      icon: "success",
      confirmButtonText: "Empezar",
      allowOutsideClick: false
    }).then(() => {
      showScreen("screen-start");
    });
  } else {
    updateGameScreen();
  }
});
