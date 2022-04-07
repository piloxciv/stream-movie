const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "b723ca078d5fe6bd33e9c3967dfa222e";

const searchMovies = async() => {
    const textSearch = document.getElementById("search-movie").value;
    
    if(textSearch.length < 3){return;}

    const movies = await getMovies(textSearch)

    let html = "";

    movies.forEach(movie => {
            const { id, title, overview, poster_path} = movie;
            const urlMoreInfo = `../movie.html?id=${id}`;
            const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;

            html += `
                    <div class="col-4 custom-card">
                        <div class="card">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${urlImage}" class="card-img" alt="${title}" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${overview.substr(0, 40)}...</p>
                                        <a class="btn btn-primary" href="${urlMoreInfo}">See more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
    });
    document.getElementsByClassName("list-cards")[0].innerHTML = html;
};

const getMovies = (textSearch) => {
    const url = `${URL_PATH}/3/search/movie?api_key=${API_KEY}&language=en-US&query=${textSearch}&page=1&include_adult=true`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(error => console.log(error));
}