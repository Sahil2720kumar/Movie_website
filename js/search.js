let search_movie_input=document.getElementById("search_movie_input")
let search_box_suggestion=document.getElementById("search_box_suggestion")
let movie_series_id;



search_movie_input.addEventListener("keyup",()=>{
	if(search_movie_input.value===""){
		search_box_suggestion.style.visibility="hidden";
	}else{
		search_box_suggestion.style.visibility="visible";
	}
})

//movie search option====================

search_movie_input.addEventListener("keyup",(e)=>{
	search_box_suggestion.innerHTML=""
	async function searchMovie(API){
		const response=await API
		const data=await response.json()
		let movieList=data.results
		console.log(movieList)

		for(let i=0;i<movieList.length/2; i++){
			let movie_genre_arr=[]
			let movie_genre;	
			let search_box_items=document.createElement('div')
			search_box_items.classList.add("search_box_items")		
		
			movie_genre=await fetch(`https://api.themoviedb.org/3/movie/${movieList[i].id}?api_key=aced4205f5abc72469db0dcfa25a10bd`)	
			movie_genre=await movie_genre.json()
			if(movie_genre.success===false){
				movie_genre=await fetch(`https://api.themoviedb.org/3/tv/${movieList[i].id}?api_key=aced4205f5abc72469db0dcfa25a10bd`)	
				movie_genre=await movie_genre.json()
			}
			
			
			for(let i=0; i<movie_genre.genres.length; i++){
				movie_genre_arr[i]=movie_genre.genres[i].name				
			}
			
			if(movieList[i].name===undefined){
				movieList[i].name=movieList[i].title
			}
			
			
			
			search_box_items.innerHTML=`
				<span hidden class="movie_series_id">${movieList[i].id}</span>
				<img src="http://image.tmdb.org/t/p/w500/${movieList[i].poster_path}" >
				<div class="movies_suggestion_info"  >
					<h4>${movieList[i].name}</h4>
					<p class="">${movie_genre_arr}<span style="padding:1px 2px;"  class="bg-warning mx-2 " >IMDP</span><span><i class="fas fa-star " ></i>${movieList[i].vote_average.toFixed(1)}</span></p>
				</div>
			`
			search_box_suggestion.appendChild(search_box_items)
			search_box_items.addEventListener("click",(e)=>{
				movie_series_id=movieList[i].id
				movie_series_media_type=movieList[i].media_type
				console.log(movie_series_id,movie_series_media_type)
				localStorage.setItem("movie_series_id",movie_series_id)
				localStorage.setItem('movie_series_media_type',movie_series_media_type)
				location.href="movieSeriesDetails.html"
			})
		}
	}
	search_box_suggestion.innerHTML=""
	let searchAPI=fetch("https://api.themoviedb.org/3/search/multi?api_key=aced4205f5abc72469db0dcfa25a10bd&include_adult=false&query="+e.target.value)
	searchMovie(searchAPI)
})
