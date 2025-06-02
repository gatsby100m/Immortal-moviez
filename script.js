// Demo Login User
const demoUser = {
  email: "user@immortalmovies.com",
  password: "password123",
  token: "immortal-demo-token"
};

function isLoggedIn() {
  return !!localStorage.getItem("immortalToken");
}

function updateUserIcon(loggedIn) {
  const icon = document.querySelector(".user-icon");
  icon.textContent = loggedIn ? "👤" : "G";

  icon.onclick = () => {
    if (isLoggedIn()) {
      if (confirm("Log out from Immortal Movies?")) {
        localStorage.removeItem("immortalToken");
        alert("Logged out");
        location.reload();
      }
    } else {
      showModal();
    }
  };
}

// Modal Logic
const modal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
function showModal() {
  modal.classList.remove("hidden");
}
closeModal.onclick = () => modal.classList.add("hidden");

// Login Handler
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === demoUser.email && password === demoUser.password) {
    localStorage.setItem("immortalToken", demoUser.token);
    alert("Welcome to Immortal Movies!");
    modal.classList.add("hidden");
    updateUserIcon(true);
  } else {
    alert("Invalid credentials.");
  }
});

// Movie Renderer
function renderMovies() {
  const movies = [
    { title: "Holiday Breakup", time: "38m left", img: "https://via.placeholder.com/150x85" },
    { title: "News", time: "13m left", img: "https://via.placeholder.com/150x85" },
    { title: "Jerry Springer", time: "47m left", img: "https://via.placeholder.com/150x85" },
    { title: "Epic Funny Video", time: "24m left", img: "https://via.placeholder.com/150x85" },
    { title: "FailArmy", time: "54m left", img: "https://via.placeholder.com/150x85" },
    { title: "Magic Lantern", time: "24m left", img: "https://via.placeholder.com/150x85" }
  ];

  const grid = document.querySelector(".movie-grid");
  grid.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}">
      <span class="live-tag">LIVE</span>
      <div class="movie-title">${movie.title}</div>
      <div class="movie-time">${movie.time}</div>
      <button class="favorite-btn" onclick="toggleFavorite('${movie.title}')">❤️ Favorite</button>
    `;
    grid.appendChild(card);
  });
}

function toggleFavorite(title) {
  let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favs.includes(title)) {
    favs = favs.filter(f => f !== title);
    alert(`${title} removed from favorites`);
  } else {
    favs.push(title);
    alert(`${title} added to favorites`);
  }
  localStorage.setItem("favorites", JSON.stringify(favs));
}

// Init App
window.addEventListener("DOMContentLoaded", () => {
  renderMovies();
  updateUserIcon(isLoggedIn());
});
