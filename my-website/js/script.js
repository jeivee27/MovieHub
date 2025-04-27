// Your TMDB API Key
const API_KEY = '2fc7b3876456eb119074d7db7ab5a65a'; // <-- Replace with your real TMDB API key

// Fetch Trending Movies from TMDB
async function loadMoviesFromTMDB() {
  const container = document.getElementById('movies-list');
  container.innerHTML = "<h3 style='text-align:center;'>Loading...</h3>";

  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    container.innerHTML = ""; // Clear loading text

    data.results.forEach(movie => {
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
  } catch (error) {
    console.error("Failed to load movies:", error);
    container.innerHTML = "<h3 style='text-align:center; color:red;'>Failed to load movies. Check API Key.</h3>";
  }
}

// Search Movies (optional from loaded ones)
function searchMovies() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.querySelector('img').alt.toLowerCase();
    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Featured Slider (Auto Slide)
let currentSlide = 0;
setInterval(() => {
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
}, 5000);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  loadMoviesFromTMDB();
});
