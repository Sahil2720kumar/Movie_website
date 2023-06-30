console.log("working....")
console.log("murgi...")
addEventListener("load", function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})

//==================== movie information display =======================

async function specificMovieInfoFun(API,API_Actors,API_Trailers){
	let response=await API	
	movie_series_data=await response.json()
	console.log(movie_series_data)
	
	console.log("another api==")
	response=await API_Actors
	movie_series_actors=await response.json()
	console.log(movie_series_actors)
	
	console.log("another api==")
	response=await API_Trailers
	movie_series_trailers=await response.json()
	console.log(movie_series_trailers)
	
	
	
	//variable declaration
	let ms_image=document.querySelector(".ms_image")
	let ms_title=document.querySelector(".ms_title")
	let ms_rate=document.querySelector(".rate")
	let ms_duration=document.querySelector(".duration")
	let ms_release_date=document.querySelector(".release_date")
	let ms_adult_value=document.querySelector(".adult_value")
	let ms_adult_value_parent=ms_adult_value.parentElement
	let ms_genre=document.querySelector(".ms_genre")
	let movie_genre_arr=[]
	let movie_genre;	
	let ms_overview=document.querySelector(".ms_overview")
	let ms_overview_p=document.querySelector(".ms_overview_p")
	let ms_actors=document.querySelector(".ms_actors")
	let ms_actors_arr=[]
	let ms_director=document.querySelector(".director")
	let ms_director_arr=[]
	let ms_trailer_items=document.querySelector(".ms_trailer_items")
	
	
	ms_image.src=`http://image.tmdb.org/t/p/w500/${movie_series_data.poster_path}`
	if(movie_series_data.name===undefined){
		movie_series_data.name=movie_series_data.title
	}
	ms_title.innerText=`${movie_series_data.name}`
	ms_rate.innerHTML=`<i style="color:RGB(255,233,0);"  class="fas fa-star mx-1 " ></i>${movie_series_data.vote_average.toFixed(1)}`
	
	//ms_duration.....
	if(ms_media_type==="tv"){
	
	}else{
		ms_duration.innerHTML=`${movie_series_data.runtime}m`
	}
	
	
	
	if(ms_media_type==="tv"){
		ms_release_date.innerText=`${movie_series_data.first_air_date.slice(0,4)}`
	}else{
		ms_release_date.innerText=`${movie_series_data.release_date.slice(0,4)}`
	}
	
	// adult check---
	if(movie_series_data.adult===true){
		ms_adult_value_parent.style.background="#FF7276"
	}
	
	ms_adult_value.innerText=`${movie_series_data.adult}`
	
	//genre & overview
	for(let i=0; i<movie_series_data.genres.length; i++){
		movie_genre_arr[i]=movie_series_data.genres[i].name				
	}
	ms_genre.innerText=`${movie_genre_arr} | ${ms_media_type}`
	ms_overview_p.innerHTML=`${movie_series_data.overview}`
	
	//actors
	for(i=0;i<movie_series_actors.cast.length;i++){
		ms_actors_arr[i]=movie_series_actors.cast[i].name
	}
	ms_actors.innerHTML=`${ms_actors_arr}`
	
	//directors
	if(ms_media_type==="tv"){
		for(i=0;i<movie_series_data.created_by.length;i++){
			ms_director_arr[i]=movie_series_data.created_by[i].name
		}
		ms_director.innerHTML=`${ms_director_arr}`
	}else{
		for(i=0;i<movie_series_data.production_companies.length;i++){
			ms_director_arr[i]=movie_series_data.production_companies[i].name
		}
		ms_director.innerHTML=`${ms_director_arr}`
		ms_director.previousElementSibling.innerHTML="Production Companies"
	}

	
	
	//trailers
	for(i=0;i<movie_series_trailers.results.length; i++){
		ms_trailer_items.innerHTML+=`
			<div class="ms_tralier_item" >
				<i class="ms_trailer_loader"  style="color:white;opacity:0.7;text-align:center;"  class="fas fa-video " ></i>
				<iframe class="ms_trailer_video"  width="250" height="150" src="https://www.youtube.com/embed/${movie_series_trailers.results[i].key}"></iframe>
			</div>
		`
	}
	
}

let ms_id=parseInt(localStorage.getItem("movie_series_id"))
let ms_media_type=localStorage.getItem("movie_series_media_type")
let API_Details=fetch(`https://api.themoviedb.org/3/${ms_media_type}/${ms_id}?api_key=aced4205f5abc72469db0dcfa25a10bd`)
let API_Actors_Details=fetch(`https://api.themoviedb.org/3/${ms_media_type}/${ms_id}/credits?api_key=aced4205f5abc72469db0dcfa25a10bd`)
let API_Trailers=fetch(`https://api.themoviedb.org/3/${ms_media_type}/${ms_id}/videos?api_key=aced4205f5abc72469db0dcfa25a10bd`)

specificMovieInfoFun(API_Details,API_Actors_Details,API_Trailers)

//similar movies...............==================

let cards=document.getElementsByClassName("cards")
let chevron_left=document.getElementsByClassName("chevron-left")
let chevron_right=document.getElementsByClassName("chevron-right")


for(let cardsElement of cards){
	chevron_left=cardsElement.previousElementSibling.previousElementSibling
	chevron_right=cardsElement.previousElementSibling
	
	chevron_left.addEventListener("click",()=>{
		cardsElement.scrollLeft-=140;
	})
	chevron_right.addEventListener("click",()=>{
		cardsElement.scrollLeft+=140;
	})
}


//  section. cards reuse function movie
async function movieDisplayFun(API,section_cards){
	section_cards.innerHTML=""
	
	const response=await API
	const data=await response.json()
	let moviePopularList=data.results
	//console.log(moviePopularList)
	
	
	
	for(let i=0;i<moviePopularList.length; i++){
		let movie_genre_arr=[]
		let movie_genre;
		movie_genre=await fetch(`https://api.themoviedb.org/3/${ms_media_type}/${moviePopularList[i].id}?api_key=aced4205f5abc72469db0dcfa25a10bd&include_adult=TRUE`)	
		movie_genre=await movie_genre.json()
		
		for(let i=0; i<movie_genre.genres.length; i++){
			movie_genre_arr[i]=movie_genre.genres[i].name				
		}
		movie_genre_arr.length=2
		
		let card=document.createElement("div")
		card.classList.add("card");
		
		if(ms_media_type=="tv"){
			card.innerHTML=`
				<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].poster_path}" >
					<div class="rest_card" >
						<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].backdrop_path}" >
						<div class="rest_card_content" >
							<p class="movie_name" >${moviePopularList[i].name}</p>
							<div class="sub">
								<span class="movie_genre" >${movie_genre_arr}<br><span class="release_year" >${moviePopularList[i].first_air_date.slice(0,4)}</span></span>
								<p class="rating" ><span style="padding:1px 2px;color: black; font-weight:bolder; background:RGB(255,233,0);"  class="mx-2 " >IMDP</span><br><span><i class="fas fa-star " ></i>${moviePopularList[i].vote_average.toFixed(1)}</span></p>
							</div>
						</div>
					</div>
			`
		}else{
			card.innerHTML=`
				<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].poster_path}" >
					<div class="rest_card" >
						<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].backdrop_path}" >
						<div class="rest_card_content" >
							<p class="movie_name" >${moviePopularList[i].title}</p>
							<div class="sub">
								<span class="movie_genre" >${movie_genre_arr}<br><span class="release_year" >${moviePopularList[i].release_date}</span></span>
								<p class="rating" ><span style="padding:1px 2px;color: black; font-weight:bolder; background:RGB(255,233,0);"  class="mx-2 " >IMDP</span><br><span><i class="fas fa-star " ></i>${moviePopularList[i].vote_average.toFixed(1)}</span></p>
							</div>
						</div>
					</div>
			`
		}
		section_cards.appendChild(card)
		card.addEventListener("click",()=>{
			let movie_series_id=moviePopularList[i].id
			let movie_series_media_type=ms_media_type
			console.log(movie_series_id,movie_series_media_type)
			localStorage.setItem("movie_series_id",movie_series_id)
			localStorage.setItem('movie_series_media_type',movie_series_media_type)
			location.href="movieSeriesDetails.html"
		})
	}
}

// popular section
let similar_section=document.getElementById("similar_movie_section")
let similar_section_cards=similar_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
/*let movieSimilarAPI=fetch(`https://api.themoviedb.org/3/${ms_media_type}/popular?api_key=aced4205f5abc72469db0dcfa25a10bd&page=5`)*/
let movieSimilarAPI=fetch(`https://api.themoviedb.org/3/${ms_media_type}/${ms_id}/recommendations?api_key=aced4205f5abc72469db0dcfa25a10bd`)
//console.log(`https://api.themoviedb.org/3/${ms_media_type}/${ms_id}/recommendations?api_key=aced4205f5abc72469db0dcfa25a10bd&include_adult=TRUE`)
//console.log("above is url")
movieDisplayFun(movieSimilarAPI,similar_section_cards)

