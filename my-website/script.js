const API_KEY = '2fc7b3876456eb119074d7db7ab5a65a'; // <--- Replace this with your real TMDB API KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

let currentMovieId = null;
let currentType = 'movie';

// 🚀 Load Banner Trailer
async function loadBannerTrailer() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
  const res2 = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${API_KEY}`);
  const videos = await res2.json();
  const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  const bannerVideo = document.getElementById('banner-video');
  const bannerTitle = document.getElementById('banner-title');

  if (trailer) {
    bannerVideo.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0&showinfo=0&modestbranding=1&playsinline=1`;
    bannerVideo.style.display = 'block';
    bannerTitle.innerText = randomMovie.title || randomMovie.name || "Premium Movies";
  } else {
    bannerTitle.innerText = randomMovie.title || "Premium Movies";
  }
}

// 🚀 Start App
fetchTrendingMovies();
fetchTrendingTV();
fetchTrendingAnime();
loadFavorites();
loadBannerTrailer();
