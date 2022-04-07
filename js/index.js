const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "b723ca078d5fe6bd33e9c3967dfa222e";

document.addEventListener("DOMContentLoaded", () => {
    renderNewMovies();
    renderListMovies('popular', 'now-playing__list');
    renderListMovies('top_rated', 'top-rated-playing__list');
})

const getMovies = (type) => {
  const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=1
    `;

    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error));
}

const renderNewMovies = async () => {
    const newMovies = await getMovies('now_playing');

    let html = '';

    newMovies.forEach((movie, index) => {
        const {id, title, overview, backdrop_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `/movie.html?id=${id}`;

        html += `
        <div class="carousel-item ${index === 0 ? "active" : null}" style="background-image: url('${urlImage}')">
        <div class="carousel-caption d-none d-md-block">
         <h5>${title}</h5>
         <p>${overview}</p>
         <a href="${urlMovie}" class="btn btn-primary">More info.</a>
        </div>
        </div>
        `;  
    });

    html += `
    <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev" onclick="$('#carousel-news-movies').carousel('prev')">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next" onclick="$('#carousel-news-movies').carousel('next')">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
    `
    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;

}

const renderListMovies = async (type, classLoc) => {
  const movies = await getMovies(type);

  let html = "";
  movies.forEach((movie, index) => {

      const {id, title, poster_path} = movie;
      const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;
      const urlMovie = `../movie.html?id=${id}`;

      if (index < 5 ){
        html += `
        <li class="list-group-item">
          <img src="${movieCover}" alt="${title}">
          <h3>${title}</h3>
          <a href="${urlMovie}" class="btn btn-primary">See more</a>
        </li>
        `;
      }
      document.getElementsByClassName(classLoc)[0].innerHTML = html;
  });
}