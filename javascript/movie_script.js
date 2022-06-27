//async function to get movie
async function getMovie(){
    
    //fetching movie from API basis of url query string
    let response=await fetch(`https://www.omdbapi.com/?i=${location.search.substring(1)}&apikey=d91a9827`);
    let data=await response.json();
    console.log(data);

    //template to show content complete information
    document.getElementById('movie_store').innerHTML=`
            <div class="container-md my-4 py-2 border">
                <div class="d-flex justify-content-evenly">
                    <div class="col">
                        <h3>${data.Title}</h3>
                        <span>${data.Year} &bull; ${data.Rated} &bull; ${data.Runtime}</span>   
                    </div>
                    <div class="col d-flex justify-content-evenly">
                        <div>
                            <span class="bg-light"><b>IMDb RATING</b></span><br>
                            <span>&#9733; ${data.imdbRating}/10</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>IMDb VOTES</b></span><br>
                            <span><i class="fa fa-thumbs-up"></i> ${data.imdbVotes}</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>IMDb ID</b></span><br>
                            <span>${data.imdbID}</span>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-evenly">
                    <div class="col-2">
                        <h3>Poster</h3>
                        <span><img class="bd-placeholder-img card-img-top" height=225 style="width:200px;margin:5px auto;" src="${data.Poster}" /></span>   
                    </div>
                    <div class="col offset-1 d-flex flex-column justify-content-evenly">
                        <div>
                            <span class="bg-light"><b>Director</b></span><br>
                            <span>${data.Director}</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>Writer</b></span><br>
                            <span>${data.Writer}</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>Actors</b></span><br>
                            <span>${data.Actors}</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>Language</b></span><br>
                            <span>${data.Language}</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>Country</b></span><br>
                            <span>${data.Country}</span>
                        </div>
                        <div>
                            <span class="bg-light"><b>Awards</b></span><br>
                            <span>${data.Awards}</span>
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <span class="bg-light"><b>Plot</b></span><br>
                    <span>${data.Plot}</span>
                </div>
                <div>
                    <span class="bg-light"><b>Genre</b></span><br>
                    <span>${data.Genre}</span>
                </div>
            </div>
    `;
}
getMovie();