const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "b723ca078d5fe6bd33e9c3967dfa222e";

document.addEventListener("DOMContentLoaded", () => {
    let { page } =  getUrlVars();
    page == undefined ? page = 1 : null;
    renderPopularMovies(page);
    renderControls(page);
});

const getUrlVars = () => {
    let vars = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    })
    return vars;
}   

const getPopulaMovies = (page) => {
    const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

  return fetch(url) 
        .then(response => response.json())
        .then(result => result.results)
        .catch(error => console.log(error));

}

const renderPopularMovies = async (page) => {
    const movies = await getPopulaMovies(page);
    
    let html = "";

    movies.forEach(movie => {
        const { id, title, poster_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
        const urlMoreInfo = `../movie.html?id=${id}`;

        html += `
                <div class="col-3 col-custom">
                    <a href="${urlMoreInfo}" class="card custom-card">
                        <img src="${urlImage}" class="card-img-top" alt="${title}" />
                        <div class="card-body">
                        <h4 class="card-title text-center m-0">${title}</h4>
                        </div>
                    </a>
                </div>
        `;
    });
    document.getElementsByClassName('list-cards')[0].innerHTML = html;
}

const renderControls = (page) => {
    const baseUrlPage = "../popular.html?page=";
    const pageNumber = parseInt(page)
    const previous = pageNumber - 1;
    const next = pageNumber + 1;

    let html = "";
    if(page == 1) {
        html = `
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a href="#" class="page-link">
                        <i class="fas fa-chevron-left"></i>
                    </a>
                </li>
                <li class="page-item active">
                    <a href="${baseUrlPage + "1"}" class="page-link">1</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage + "2"}" class="page-link">2</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage + "3"}" class="page-link">3</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage + "2"}" class="page-link">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        `;
    } else {
        html = `
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a href="${baseUrlPage + previous}" class="page-link">
                        <i class="fas fa-chevron-left"></i>
                    </a>
                </li>
                <li class="page-item ">
                    <a href="${baseUrlPage + previous}" class="page-link">${previous}</a>
                </li>
                <li class="page-item active">
                    <a href="${baseUrlPage + page}" class="page-link">${page}</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage + next}" class="page-link">${next}</a>
                </li>
                <li class="page-item">
                    <a href="${baseUrlPage + next}" class="page-link">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        `;
    }

    document.getElementsByClassName('navigation')[0].innerHTML = html;

}