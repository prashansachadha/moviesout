const API_KEY = 'api_key=043aa6fa3b09925e0aa89b8eb7137f6e';
const API_URL = 'https://api.themoviedb.org/3';
const start_movie_url = API_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const start_shows_url = API_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = API_URL + '/search/movie?' + API_KEY + '&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const body = document.querySelector("body");
const header = document.querySelector("header");
const moviesHeader = document.querySelector(".movies-header");
const showsHeader = document.querySelector(".shows-header");
const genreHeader = document.querySelector(".genre-header");
const yearHeader = document.querySelector(".year-header");

// Get initial movies
// getMovies(start_shows_url);
getMovies(start_movie_url);

// fetch data from db and set on UI
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    if (data.results.length == 0) {
        // console.log("here");
        main.innerHTML = `<h2>No results found, Sorry!</h2>`
    } else showMovies(data.results);
}

// to reflect changes on UI
function showMovies(moviesData, flag) {
    console.log(flag);
    if (!flag) {
        main.innerHTML = '';
    }

    moviesData.map((movie) => {
        // destructuring
        const { title, poster_path, vote_average } = movie;

        // create curr movie tag
        const currMovie = document.createElement('div');
        currMovie.classList.add('movie');

        currMovie.innerHTML = `
        <img src="${poster_path !== null ? IMG_PATH + poster_path : './images/replace-image.jpg'}" alt="${title}">`;
        currMovie.addEventListener("click", function () {
            showMovieDetails(movie);
        })

        currMovie.addEventListener('mouseenter', function () {
            // add fav n rating btn

        })

        currMovie.addEventListener('mouseleave', function () {
            // remove fav n rating btn
        })

        main.appendChild(currMovie);
    })
}

// get similar movies data
async function getSimilar(movie) {
    const similar = API_URL + `/movie/${movie.id}/similar?` + API_KEY;
    const res = await fetch(similar);
    const data = await res.json();
    // console.log(data.results);
    showSimilarMovies(data.results);
}

// neeche wala box
function showSimilarMovies(moviesData) {
    moviesData = moviesData.splice(0, 7);
    let similarModal = document.createElement("div");
    similarModal.classList.add("similar-movie-list");
    let txtDiv = document.createElement("div");
    txtDiv.classList.add("similar-text");
    txtDiv.innerText= "You may also like >";
    similarModal.appendChild(txtDiv);
    moviesData.map((movie) => {
        const { title, poster_path } = movie;

        // create curr movie tag
        const currMovie = document.createElement('div');
        currMovie.classList.add('movie-list-item');

        currMovie.innerHTML = `
        <img src="${poster_path !== null ? IMG_PATH + poster_path : './images/replace-image.jpg'}" alt="${title}">`;
        currMovie.addEventListener("click", function () {
            let prnt = document.querySelector(".movie-detail-parent");
            prnt.remove();  
            showMovieDetails(movie);
        })
        similarModal.appendChild(currMovie);
    })
    let parent = document.querySelector(".movie-detail-container");  
    parent.appendChild(similarModal);
}

// isme movie details aayengi saari display hone k liye
function showMovieDetails(movie) {
    const { title, poster_path, vote_average, release_date, overview } = movie;
    let parent = document.createElement("div");
    parent.classList.add("movie-detail-parent");

    // transparent modal for movie details - on click pe aayega
    let trans = document.createElement('div');
    trans.classList.add("transparent");

    // close btn modal delete k liye
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = 'X';

    // details add
    let details = document.createElement("div");
    details.classList.add("movie-detail-container");
    details.innerHTML = `<div class="img-details"> <img src="${IMG_PATH + poster_path}" alt="${title}">
                        <div class="details">
                            <h1>${title}</h1>
                            <h3>Release : ${release_date.split("-")[0]}</h3>
                            <h3>Rating : ${vote_average}</h3>
                            <h3>Overview</h3>
                            <p>${overview}</p>
                        </div></div>`;

    trans.addEventListener("click", function () {
        parent.remove();
    });

    closeBtn.addEventListener("click", function () {
        parent.remove();
    });

    parent.appendChild(trans);
    parent.appendChild(closeBtn);
    parent.appendChild(details);
    body.appendChild(parent);
    getSimilar(movie);
}

// ------------- SHowsssssssssssssssssssss

// fetch data from db and set on UI
async function getShows(url) {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results);
    if (data.results.length == 0) {
        // console.log("here");
        main.innerHTML = `<h2>No results found, Sorry!</h2>`
    } else showShows(data.results);
}

// to reflect changes on UI
function showShows(showsData, flag) {
    // console.log(moviesData);
    if (!flag) main.innerHTML = '';

    showsData.map((show) => {
        // destructuring
        const { name, poster_path } = show;

        // create curr movie tag
        const currShow = document.createElement('div');
        currShow.classList.add('movie');

        currShow.innerHTML = `
        <img src="${poster_path !== null ? IMG_PATH + poster_path : './images/replace-image.jpg'}" alt="${name}">`;
        currShow.addEventListener("click", function () {
            showShowDetails(show);
        })

        currShow.addEventListener('mouseenter', function () {
            // add fav n rating btn

        })

        currShow.addEventListener('mouseleave', function () {
            // remove fav n rating btn
        })

        main.appendChild(currShow);
    })
}

// get similar show data
async function getSimilarShowsUrl(show) {
    const similar = API_URL + `/tv/${show.id}/similar?` + API_KEY;
    const res = await fetch(similar);
    const data = await res.json();
    console.log(data.results);
    showSimilarShows(data.results);
}

// neeche wala box
function showSimilarShows(showsData) {
    showsData = showsData.splice(0, 7);
    let similarModal = document.createElement("div");
    similarModal.classList.add("similar-movie-list");
    let txtDiv = document.createElement("div");
    txtDiv.classList.add("similar-text");
    txtDiv.innerText= "You may also like";
    similarModal.appendChild(txtDiv);
    showsData.map((show) => {
        const { name, poster_path } = show;

        // create curr movie tag
        const currShow = document.createElement('div');
        currShow.classList.add('movie-list-item');

        currShow.innerHTML = `
        <img src="${poster_path !== null ? IMG_PATH + poster_path : './images/replace-image.jpg'}" alt="${name}">`;
        currShow.addEventListener("click", function () {
            let prnt = document.querySelector(".movie-detail-parent");
            prnt.remove();  
            showShowDetails(movie);
        })
        similarModal.appendChild(currShow);
    })
    let parent = document.querySelector(".movie-detail-container");
    parent.appendChild(similarModal);
}

// isme movie details aayengi saari display hone k liye
function showShowDetails(show) {
    const { name, poster_path, vote_average, first_air_date, overview } = show;
    let parent = document.createElement("div");
    parent.classList.add("movie-detail-parent");

    // transparent modal for movie details - on click pe aayega
    let trans = document.createElement('div');
    trans.classList.add("transparent");

    // close btn modal delete k liye
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = 'X';

    // details add
    let details = document.createElement("div");
    details.classList.add("movie-detail-container");
    details.innerHTML = `<div class="img-details"><img src="${IMG_PATH + poster_path}" alt="${name}">
                        <div class="details">
                            <h1>${name}</h1>
                            <h3>Release : ${first_air_date.split("-")[0]}</h3>
                            <h3>Rating : ${vote_average}</h3>
                            <h3>Overview</h3>
                            <p>${overview}</p>
                        </div></div>`;

    trans.addEventListener("click", function () {
        parent.remove();
    });

    closeBtn.addEventListener("click", function () {
        parent.remove();
    });

    parent.appendChild(trans);
    parent.appendChild(closeBtn);
    parent.appendChild(details);
    body.appendChild(parent);
    getSimilarShowsUrl(show);
}


// search wala kaam
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e.currentTarget.children[0].value);
    const searchVal = e.currentTarget.children[0].value;

    if (searchVal && searchVal !== '') {
        let selectedTag = document.querySelector('.selected');
        if (selectedTag != null) selectedTag.classList.remove('selected');
        getMovies(SEARCH_API + searchVal);

    } else {
        window.location.reload();
    }
})


function changeHeader(curr) {
    let prior = document.querySelector(".selected-header");
    prior.classList.remove("selected-header");
    let priorTag = document.querySelector(".tag-container");
    if (priorTag != null) priorTag.remove();
    // console.log(curr.classList);
    curr.classList.add("selected-header");
}


genreHeader.addEventListener('click', function () {
    // console.log(e.currentTarget);
    changeHeader(this);
    // add genre container
    

    // header.style.height = '250px';
    let tagsDiv = document.createElement("div");
    tagsDiv.classList.add('tag-container');
    genres.map((curr) => {
        let tag = document.createElement("div");
        tag.classList.add('tag-item');
        tag.id = curr.id;
        tag.innerText = curr.name;
        tag.addEventListener("click", () => {
            // select / unselect
            let priorTag = document.querySelector(".selected");
            if (priorTag) {
                priorTag.classList.remove("selected");
            }
            tag.classList.add("selected");
            searchByGenre(tag.id);
        })
        tagsDiv.appendChild(tag);
    });
    genreShows.map((curr) => {
        if (!genres.includes(curr.id)) {
            let tag = document.createElement("div");
            tag.classList.add('tag-item');
            tag.id = curr.id;
            tag.innerText = curr.name;
            tag.addEventListener("click", () => {
                // select / unselect
                let priorTag = document.querySelector(".selected");
                if (priorTag) {
                    priorTag.classList.remove("selected");
                }
                tag.classList.add("selected");
                searchByGenre(tag.id);
            })
            tagsDiv.appendChild(tag);
        }
    })

    header.appendChild(tagsDiv);
});

function searchByGenre(id) {
    getMovies(start_movie_url + '&with_genres=' + id);
    getShows(start_shows_url + '&with_genres=' + id, true);
}

moviesHeader.addEventListener("click", function () {
    changeHeader(this);
    getMovies(start_movie_url);
});

showsHeader.addEventListener("click", function () {
    changeHeader(this);
    getShows(start_shows_url);
});


function searchByYear(year) {
    getMovies(start_movie_url + '&year=' + year);
    getShows(start_shows_url + '&first_air_date_year=' + year, true);
}

yearHeader.addEventListener("click", function () {
    changeHeader(this);
    let prior = document.querySelector(".tag-container");
    if (prior != null) prior.remove();
    // header.style.height = '300px';
    let yearDiv = document.createElement("div");
    yearDiv.classList.add('tag-container');
    years.map((curr) => {
        let year = document.createElement("div");
        year.classList.add('tag-item');
        year.id = curr;
        year.innerText = curr;
        year.addEventListener("click", () => {
            // select / unselect
            let priorTag = document.querySelector(".selected");
            if (priorTag) {
                priorTag.classList.remove("selected");
            }
            year.classList.add("selected");
            searchByYear(curr);
        })
        yearDiv.appendChild(year);
    });
    header.appendChild(yearDiv);

});

// remove genre cont
header.addEventListener('mouseleave', () => {
    let tagsDiv = document.querySelector('.tag-container');
    // header.style.height = 'inherit';
    if (tagsDiv != null) tagsDiv.remove();
});
