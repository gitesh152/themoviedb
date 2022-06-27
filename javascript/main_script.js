//Event listener for querying content 
document.getElementById('form_submit').addEventListener('click',function(e){
    e.preventDefault();
    //checking if query string is given or not
    if(document.myform.searchString.value=='' || document.myform.searchString.value==null){
        return alert("Please enter something to search ...");
    }
    //calling fetchMovies fn to fetch content
    fetchMovies(document.myform.searchString.value);
    document.myform.searchString.value='';
});

//fetchMovies async fn to fetch content
async function fetchMovies(string){ 
    try{
        //fetching content from API.
        let response=await fetch(`https://www.omdbapi.com/?t=${string}&apikey=d91a9827`);
        let data=await response.json();
        console.log(data);

        //if API does not return any content, as input string does not match content title
        if(data.Title===undefined){
            return alert("Content not found ...");
        }

        //checking if fetched content is our fav list
        let favcheck=checkFav(data.imdbID);
        
        //rendering API fetched content
        let li=document.createElement('li');
        li.innerHTML=`
        <div class="col-3 mx-auto">
            <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" height=225 style="width:200px;margin:5px auto;" src="${data.Poster}" />
                <div class="card-body">
                    <h5>${data.Title}</h5>
                    <p class="card-text">${data.Plot}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div  class="btn-group">
                            <a class="view-btn btn btn-warning text-white" href="./movie.html?${data.imdbID}">View</a>
                            <button type="button"  class="fav-btn active btn btn-sm btn-outline-primary mx-1" onclick=toggleFav("${data.imdbID}")  >  ${favcheck ? 'UnFavourite' : 'Favourite'}   </button>
                        </div>
                        <small class="text-muted">imdb Rating : ${data.imdbRating}</small>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.getElementById('movies_list').innerHTML='';
        document.getElementById('movies_list').append(li);
    }
    catch(error){
        if(error)
        console.log(error);
    }
}

let favList=[];
// let favList=["tt0242423","tt8231808"]; //dummy array of fav content IDs

//fn to toggle favourite button on content
function toggleFav(movie_id){

    //check if content already exist
    let isInFav=favList.filter((e)=>{
        return e === movie_id 
    });

    //if exist then remove(filter)
    if(isInFav.length>0){
        //changing text
        document.getElementsByClassName('fav-btn')[0].innerText='Favourite';
        favList=favList.filter((e)=>{return e!==movie_id});
    }

    //if not exist then add(push) 
    else{
        //changing text
        document.getElementsByClassName('fav-btn')[0].innerText='UnFavourite';
        favList.push(movie_id);
    }
    console.log(favList);

    //string fav content array in localstorage
    localStorage.setItem("fav_array",JSON.stringify(favList));
}

    //checking if fetched content is our fav list
    function checkFav(id){
        let isInFav=favList.filter((e)=>{ 
            return e === id 
        });
        if(isInFav.length>0)
        return true;
        else
        false;
    }