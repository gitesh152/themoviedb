try{
    //Getting fav cotent from localstrorage
    let favMovies=JSON.parse(localStorage.getItem("fav_array"));
    
    //if there is fav content, we render that
    if(favMovies){
        console.log(favMovies);
        favMovies.forEach(element => {
        //calling renderFavs on each content
        renderFavs(element);
        });
    }

    //else we render our custom section
    else{
        document.getElementById('main_container').innerHTML=`
        <h3 class="py-2">Favourite Content</h3>
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-12 col-md-8 mx-auto">
                    <h1 class="fw-light">!!Oops, your favourites is empty</h1>
                    <p class="lead my-2">Don't panic :) :) just go and add something to your list</p>
                    <a href="./index.html" class="btn btn-primary my-2">Home</a>
                </div>
            </div>
        </section>
        `;
    }

    //renderFavs fn
    async function renderFavs(favMovieId){
    
    //fetching content data from content id
    let response=await fetch(`https://www.omdbapi.com/?i=${favMovieId}&apikey=d91a9827`);
    let data=await response.json();
    let li=document.createElement('li');

    //template to show fav contents in cards
    li.innerHTML=`
        <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" height=225 style="width:200px;margin:5px auto;" src="${data.Poster}" />
                <div class="card-body">
                    <h5>${data.Title}</h5>
                    <p class="card-text" style="height:100px;overflow:hidden;">${data.Plot}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div  class="btn-group">
                            <a class="view-btn btn btn-warning text-white" href="./movie.html?${data.imdbID}">View</a>
                            <button type="button" class="fav-btn active btn btn-sm btn-outline-danger mx-1" onclick=removeFav("${data.imdbID}")  >Remove</button>
                        </div>
                        <small class="text-muted">imdb Rating : ${data.imdbRating}</small>
                    </div>
                </div>
            </div>
    `;

    //adding content to list
    document.getElementById('fav_movies').append(li);
    }

    //function to remove content from fav list
    function removeFav(id){
        favMovies=favMovies.filter((e)=>{ 
            return e !== id 
        });  
        location.reload();
        localStorage.setItem("fav_array",JSON.stringify(favMovies));
    }
}
catch(error){
    if(error)
    console.log(error);
}