const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "b723ca078d5fe6bd33e9c3967dfa222e";

let MOVIE_ID = "";

document.addEventListener("DOMContentLoaded", () => {
    MOVIE_ID = getUrlVars().id;
    renderMovieDetails(MOVIE_ID);
})

const getUrlVars = () => {
    let vars = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    })
    return vars;
}

const getMovieDetails = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

     return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log(error));
}

const renderMovieDetails = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    const {backdrop_path, poster_path, title, overview, genres, release_date, vote_average} = movieDetails;

    renderBackground(backdrop_path);
    renderPoster(poster_path, title);
    renderMovieData(title, overview, genres, release_date, vote_average);
    getTeaser(movieId);
}

const renderBackground = (backdrop_path) => {
    const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    document.getElementsByClassName("movie-info")[0].style.backgroundImage = `url('${urlBackground}')`;
}

const renderPoster = (poster_path, title) => {

   const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
    const html = `
            <img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}" />
    `;

    document.getElementsByClassName("movie-info__poster")[0].innerHTML = html;
}   

const renderMovieData = (title, overview, genres, release_date, vote_average) => {
    const dataSplit = release_date.split('-');

    let htmlGenres = "";
    genres.forEach(genre => {
        htmlGenres += `<li>${genre.name}</li>`;
    });

    const html = `
        <h1>
            ${title}
            <span class="date-any">${dataSplit[0]}</span>
            <span class="teaser" data-bs-toggle="modal" data-bs-target="#videoTeaser"> 
            <i class="fa-solid fa fa-play"></i> Ver trailer
            </span>
        </h1>
        <h5>General</h5>
        <p>${overview}</p>
        <h5>Genre</h5>
        <ul>
        ${htmlGenres}
        </ul>
        <br>
        <h5>Rate: ${vote_average}</h5>
    `;
        document.getElementsByClassName("movie-info__data")[0].innerHTML = html;
}

const getTeaser = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(result => {renderTeaser(result)})
        .catch(error => console.log(error));
}

const renderTeaser = (objVideo) => {
    let keyVideo = "";

    objVideo.results.forEach(video => {
        if (video.type === "Teaser" && video.site === "YouTube") {
            keyVideo = video.key;
        }
    });

    let urlIframe = "";
    if (keyVideo !== ""){
         urlIframe = `
            <iframe id="playerid" width="100%" height="440px" src="https://www.youtube.com/embed/${keyVideo}"
            frameborder="0" allow="accelerometer"; autoplay; encrypted-media;
            gryscope; picture-in-picture"allowfullscreen></iframe>
            `;
    }else {
        urlIframe = "<div class='no-teaser'>There is no trailer</div>";
    }


    /* Stop video when modal its close  */

    $(function(){
        $("body").on('hidden.bs.modal', function (e) {
          var $iframes = $(e.target).find("iframe");
          $iframes.each(function(index, iframe){
            $(iframe).attr("src", $(iframe).attr("src"));
          });
        });
      });

    document.getElementsByClassName('video-teaser-iframe')[0].innerHTML = urlIframe;
}
