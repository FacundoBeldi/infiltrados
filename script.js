// =====================
// VARIABLES Y ESTADO
// =====================

const WORDS = [

  //PALABRAS COMUNES
  "Pizza","Computadora","Romeo Celestial","Playa","Cine","Auto","Perro","Viaje","Música","Café",
  "Teléfono","Libro","Avión","Tren","Barco","Casa","Puerta","Ventana","Silla","Mesa",
  "Zapato","Camisa","Sombrero","Reloj","Lámpara","Televisión","Radio","Celular","Teclado","Ratón",
  "Helado","Chocolate","Hamburguesa","Pan","Queso","Leche","Agua","Jugo","Cerveza","Vino",
  "Fútbol","Tenis","Basket","Natación","Ciclismo","Boxeo","Rugby","Golf","Esquí","Surf",

  //LOL
  "Summoner's Rift","ARAM","Baron Nashor","Dragon","Heraldo","Top Lane","Mid Lane","Bot Lane", "Support", "Skin", "Cooldown",
  "Mana","Inhibitor","Gank","Ward","Smite", "Flash","Ignite","Exhaust","Ranked","Challenger","Plata",
  "Bronce","Pentakill","Ace","Meta","Runas","Items","Combo","Outplay",

  //ARGENTINA
  "Marley","Pachu Peña","Marcelo Tinelli","Susana Giménez","Mirtha Legrand","Guido Kaczka","Cris Morena",
  "Diego Maradona","Lionel Messi","Carlos Tévez","Juan Román Riquelme","Ricardo Darín","Guillermo Francella","Adrián Suar",
  "Florencia Peña","Dady Brieva","Luisana Lopilato","Peter Lanzani","Tini Stoessel","Lali Espósito","Abel Pintos","Charly García"
  ,"Gustavo Cerati","Sandro","Rodrigo","La Mona Jiménez","Patricia Sosa","Jorge Rial","Alejandro Fantino","Cacho Castaña",
  "José María Listorti","Del Potro","Yayo","Pampita", "Alberto Fernandez","Cristina Fernández","Mauricio Macri","Lionel Scaloni",

  //PAÍSES
  "Argentina","Brasil","Chile","Uruguay","Paraguay","Bolivia","Perú","México","Estados Unidos","Canadá",
  "España","Francia","Italia","Alemania","Reino Unido","China","Japón","Corea","India","Australia",

  //PELICULAS
  "Titanic","Avatar","Inception","Matrix","Gladiator","Interstellar","The Godfather","Star Wars","Jurassic Park","Frozen",
  "Toy Story","Shrek","Harry Potter","The Dark Knight","Forrest Gump","Pulp Fiction","The Lion King","Finding Nemo","Up","Coco",

  //CANTANTES
  "Michael Jackson","Madonna","Elton John","Freddie Mercury","Shakira","Rihanna","Beyoncé","Taylor Swift","Ed Sheeran","Adele",
 
  //APODOs FACU
  "Gro","Topo","Iago","Bona","Cacu","El Chaz","Chuca","Migue Peña","Raspu","Naza",
  "Uli","Romo","Renzo","Juancho",
 
  //CS:GO
  "Mirage","Inferno","Dust2","Nuke","Ancient","Anubis","Cache","Train","Banana","Rampa","CT","TT Spawn","Palacio","Site",
  "Connector","Jungla","Ventana","L", "Cielo", "Lobby","Garage", "Departamento","Mercado","Iglesia", "Tumba","Fuenta","Túnel","Puertas dobles","Cabezinha",

  //ESPACIO
  "Sol","Luna","Estrella","Planeta","Galaxia","Universo","Tiempo","Reloj","Historia","Futuro",

  //VIDEOJUEGOS
  "PlayStation","Xbox","Nintendo","Mario","Zelda","Pokémon","Minecraft","Fortnite","Counter Strike","League of Legends"
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
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function getRandomImpostors(total, count) {
  const result = [];
  while (result.length < count) {
    const rand = Math.floor(Math.random() * total);
    if (!result.includes(rand)) result.push(rand);
  }
  return result;
}

function showScreen(screenId) {
  const screens = document.querySelectorAll("div[id^='screen']");

  screens.forEach(div => {
    div.style.display = "none";
    div.classList.remove("animate__animated", "animate__fadeIn");
  });

  const screen = document.getElementById(screenId);

  // 🔥 FORZAR RECÁLCULO DE LAYOUT
  screen.style.display = "flex";
  void screen.offsetHeight;

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

  startNewRound();
  showScreen("screen-game");
});

// =====================
// NUEVA RONDA
// =====================

function startNewRound() {
  players.forEach(p => p.role = "player");

  impostorIndexes = getRandomImpostors(players.length, totalImpostors);
  impostorIndexes.forEach(i => players[i].role = "impostor");

  secretWord = getRandomWord();
  currentPlayerIndex = 0;

  updateGameScreen();
}

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
      title: "¡Ronda finalizada!",
      text: "¿Qué querés hacer?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Jugar otra ronda",
      cancelButtonText: "Cambiar jugadores",
      confirmButtonColor: "#111",
      cancelButtonColor: "#aaa",
      allowOutsideClick: false
    }).then(result => {
      if (result.isConfirmed) {
        startNewRound();
      } else {
        resetGame();
      }
    });
  } else {
    updateGameScreen();
  }
});

// =====================
// RESET TOTAL
// =====================

function resetGame() {
  players = [];
  impostorIndexes = [];
  secretWord = "";
  currentPlayerIndex = 0;
  totalPlayers = 0;
  totalImpostors = 0;

  showScreen("screen-start");
}
