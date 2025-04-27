
const API_KEY = '2fc7b3876456eb119074d7db7ab5a65a'; // <-- replace with your real TMDB API key
let allMovies = [];
let currentVisible = 8;

async function loadMoviesFromTMDB() {
  const container = document.getElementById('movies-list');
  container.innerHTML = "<h3 style='text-align:center;'>Loading...</h3>";

  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    allMovies = data.results;
    container.innerHTML = "";
    displayMovies(allMovies.slice(0, currentVisible));
  } catch (error) {
    console.error("Failed to load movies:", error);
    container.innerHTML = "<h3 style='text-align:center; color:red;'>Failed to load movies. Check API Key.</h3>";
  }
}

function displayMovies(movieArray) {
  const container = document.getElementById('movies-list');
  container.innerHTML = "";
  movieArray.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <a href="https://vidsrc.to/embed/movie/${movie.id}" target="_blank">
        <div class="poster-wrapper">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
      </a>
      <div class="rating">⭐ ${movie.vote_average.toFixed(1)}/10</div>
    `;
    container.appendChild(card);
  });
}

function loadMoreMovies() {
  currentVisible += 8;
  displayMovies(allMovies.slice(0, currentVisible));
  if (currentVisible >= allMovies.length) {
    document.getElementById('loadMoreBtn').style.display = 'none';
  }
}

function filterMovies(category) {
  let filteredMovies;
  if (category === 'all') {
    filteredMovies = allMovies;
  } else {
    filteredMovies = allMovies.filter(movie => {
      if (category === 'Action') return movie.genre_ids.includes(28);
      if (category === 'Drama') return movie.genre_ids.includes(18);
      if (category === 'Adventure') return movie.genre_ids.includes(12);
      if (category === 'Animation') return movie.genre_ids.includes(16);
    });
  }
  currentVisible = 8;
  displayMovies(filteredMovies.slice(0, currentVisible));
}

function searchMovies() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(input));
  displayMovies(filtered);
}

let currentSlide = 0;
setInterval(() => {
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
}, 5000);

document.addEventListener('DOMContentLoaded', () => {
  loadMoviesFromTMDB();
});
