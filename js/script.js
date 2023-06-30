console.log("working....")
addEventListener("load", function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})

// ============= basis coade=========================================================
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

// ============= End basis code=========================================================



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
		movie_genre=await fetch(`https://api.themoviedb.org/3/movie/${moviePopularList[i].id}?api_key=aced4205f5abc72469db0dcfa25a10bd`)	
		movie_genre=await movie_genre.json()
		
		for(let i=0; i<movie_genre.genres.length; i++){
			movie_genre_arr[i]=movie_genre.genres[i].name				
		}
		movie_genre_arr.length=2
		
		let card=document.createElement("div")
		card.classList.add("card")
		card.innerHTML=`
			<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].poster_path}" >
				<div class="rest_card" >
					<span hidden >${moviePopularList[i].id}</span>
					<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].backdrop_path}" >
					<div class="rest_card_content" >
						<p class="movie_name" >${moviePopularList[i].title}</p>
						<div class="sub">
							<span class="movie_genre" >${movie_genre_arr}<br><span class="release_year" >${moviePopularList[i].release_date.slice(0,4)}</span></span>
							<p class="rating" ><span style="padding:1px 2px;color: black; font-weight:bolder; background:RGB(255,233,0);"  class="mx-2 " >IMDP</span><br><span><i class="fas fa-star " ></i>${moviePopularList[i].vote_average.toFixed(1)}</span></p>
						</div>
					</div>
				</div>
		`
		section_cards.appendChild(card)
		card.addEventListener("click",()=>{			
			movie_series_id=moviePopularList[i].id
			movie_series_media_type="movie"
			console.log(movie_series_id,movie_series_media_type)
			localStorage.setItem("movie_series_id",movie_series_id)
			localStorage.setItem('movie_series_media_type',movie_series_media_type)
			location.href="movieSeriesDetails.html"
		})
	}
}

// popular section
let popular_section=document.getElementById("popular_section")
let popular_section_cards=popular_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let moviePopularAPI=fetch(`https://api.themoviedb.org/3/movie/popular?api_key=aced4205f5abc72469db0dcfa25a10bd`)
movieDisplayFun(moviePopularAPI,popular_section_cards)

//trending section
let trending_section=document.getElementById('trending_section')
let trending_section_cards=trending_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let movieTrendingAPI=fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=aced4205f5abc72469db0dcfa25a10bd&page=2`)
movieDisplayFun(movieTrendingAPI,trending_section_cards)

//upcoming section. 

let upcoming_section=document.getElementById('upcoming_section')
let upcoming_section_cards=upcoming_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let movieUpcomingAPI=fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=aced4205f5abc72469db0dcfa25a10bd`)
movieDisplayFun(movieUpcomingAPI,upcoming_section_cards)

//toprated section 
let toprated_section=document.getElementById('toprated_section')
let toprated_section_cards=toprated_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let movieTopratedAPI=fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=aced4205f5abc72469db0dcfa25a10bd`)
movieDisplayFun(movieTopratedAPI,toprated_section_cards)

//================= series started ===================================================


//  section. cards reuse function
async function SeriesDisplayFun(API,section_cards){
	section_cards.innerHTML=""
	
	const response=await API
	const data=await response.json()
	let moviePopularList=data.results
	//console.log(moviePopularList)
	
	
	
	for(let i=0;i<moviePopularList.length; i++){
		let movie_genre_arr=[]
		let movie_genre;
		movie_genre=await fetch(`https://api.themoviedb.org/3/tv/${moviePopularList[i].id}?api_key=aced4205f5abc72469db0dcfa25a10bd`)	
		movie_genre=await movie_genre.json()
		
		for(let i=0; i<movie_genre.genres.length; i++){
			movie_genre_arr[i]=movie_genre.genres[i].name				
		}
		movie_genre_arr.length=2
		
		let card=document.createElement("div")
		card.classList.add("card")
		card.innerHTML=`
			<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].poster_path}" >
				<div class="rest_card" >
					<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].backdrop_path}" >
					<div class="rest_card_content" >
						<p class="movie_name" >${moviePopularList[i].name}</p>
						<div class="sub">
							<span class="movie_genre" >${movie_genre_arr}<br><span class="release_year" >${moviePopularList[i].first_air_date.slice(0,4)}</span></span>
							<p class="rating" ><span style="padding:1px 2px;color: black; font-weight:bolder; background:RGB(255,233,0);"  class="mx-2 " >IMDP</span><br><span><i style="color:RGB(255,233,0);" class="fas fa-star " ></i>${moviePopularList[i].vote_average.toFixed(1)}</span></p>
						</div>
					</div>
				</div>
		`
		section_cards.appendChild(card)
		card.addEventListener("click",()=>{
			movie_series_id=moviePopularList[i].id
			movie_series_media_type="tv"
			console.log(movie_series_id,movie_series_media_type)
			localStorage.setItem("movie_series_id",movie_series_id)
			localStorage.setItem('movie_series_media_type',movie_series_media_type)
			location.href="movieSeriesDetails.html"
		})
	}
}





// series popular section
let series_popular_section=document.getElementById("series_popular_section")
let series_popular_section_cards=series_popular_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
console.log("https://api.themoviedb.org/3/tv/popular?api_key=aced4205f5abc72469db0dcfa25a10bd")
let seriesPopularAPI=fetch(`https://api.themoviedb.org/3/tv/popular?api_key=aced4205f5abc72469db0dcfa25a10bd`)
SeriesDisplayFun(seriesPopularAPI,series_popular_section_cards)

// series airingTodaysection
let series_airingToday_section=document.getElementById("series_airingToday_section")
let series_airingToday_section_cards=series_airingToday_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let seriesAiringTodayAPI=fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=aced4205f5abc72469db0dcfa25a10bd&page=2`)
SeriesDisplayFun(seriesAiringTodayAPI,series_airingToday_section_cards)

// series on the air section
let series_onTheAir_section=document.getElementById("series_onTheAir_section")
let series_onTheAir_section_cards=series_onTheAir_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let seriesOnTheAirAPI=fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=aced4205f5abc72469db0dcfa25a10bd&page=3`)
SeriesDisplayFun(seriesOnTheAirAPI,series_onTheAir_section_cards)

// series airingTodaysection
let series_TopRated_section=document.getElementById("series_TopRated_section")
let series_TopRated_section_cards=series_TopRated_section.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
let seriesTopRatedAPI=fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=aced4205f5abc72469db0dcfa25a10bd`)
SeriesDisplayFun(seriesTopRatedAPI,series_TopRated_section_cards)



