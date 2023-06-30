import {cards,chevron_left,chevron_right,SeriesDisplayFun} from "./module.js"

console.log("working....")
addEventListener("load", function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})

// tv fetching started.............

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


// filter option=====================

async function genre_Display_Fun(API_genre){
	let response=await API_genre
	let genre_list=await response.json()
	console.log(genre_list)
	
	for(let i=0; i<genre_list.genres.length; i++){
		series_genres.innerHTML+=`
			<option  value="${genre_list.genres[i].id}" >${genre_list.genres[i].name}</option>
		`
		
	}
	
	
}


let series_genres=document.querySelector(".series_genres")
let API_genre=fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=aced4205f5abc72469db0dcfa25a10bd`)
genre_Display_Fun(API_genre)



// filter display movies
let all_section_parent=document.getElementById("all_section_parent")


series_genres.addEventListener("change",(e)=>{
	//console.log(e.target.value)
	all_section_parent.innerHTML="";
	let series_genre_name;
	
	for(let i=0; i<e.target.length; i++){
		if(e.target.value===e.target[i].value){
			series_genre_name=e.target[i].text
		}		
	}
	console.log(series_genre_name)
	
	
	async function display_With_Genres_Series(API_with_genres,URL){
				
		all_section_parent.innerHTML=`
			<section id="target_series_section" class="">
				<h4>${series_genre_name} series </h4>

				<div class="cards"  >
												
				</div>
				<button id="load_btn" style="" class="btn" type="button">
					<span hidden="true" class="spinner-border spinner-border-sm load_btn_icon" role="status" aria-hidden="true"></span>
					<span class="load_btn_text" >Load more</span>
					
				</button>
			</section>	
		`
		//check this
		async function targetseriesDisplayFun(API,section_cards){
			section_cards.innerHTML=""
			
			const response=await API
			const data=await response.json()
			let seriesPopularList=data.results
			//console.log(seriesPopularList)
			
			
			
			for(let i=0;i<seriesPopularList.length; i++){
	
				let card=document.createElement("div")
				card.classList.add("card")
				card.innerHTML=`
					<img src="http://image.tmdb.org/t/p/w500/${seriesPopularList[i].poster_path}" >
				`
				section_cards.appendChild(card)
				card.addEventListener("click",()=>{			
					let movie_series_id=seriesPopularList[i].id
					let movie_series_media_type="tv"
					console.log(movie_series_id,movie_series_media_type)
					localStorage.setItem("movie_series_id",movie_series_id)
					localStorage.setItem('movie_series_media_type',movie_series_media_type)
					location.href="movieSeriesDetails.html"
				})
			}
		}
		
		
		
		let target_series_section=document.getElementById("target_series_section")
		let target_series_section_cards=target_series_section.firstElementChild.nextElementSibling
		console.log(API_with_genres)
		targetseriesDisplayFun(API_with_genres,target_series_section_cards)
		
		//load more button.................
		let load_btn=document.querySelector("#load_btn")
		let load_btn_text=document.querySelector(".load_btn_text")
		let load_btn_icon=document.querySelector(".load_btn_icon")
		let pageNo=2
		
		
		load_btn.addEventListener("click",()=>{

			load_btn_text.innerText="Loading..."
			load_btn_icon.removeAttribute("hidden")
			load_btn.setAttribute("disabled", true)
			
			async function load_More_Content(load_API,section_cards){
				let response_load_API=await load_API
				let load_API_Data=await response_load_API.json()
			    load_API_Data=load_API_Data.results
				console.log(load_API_Data)
				
				for(let i=0; i<load_API_Data.length; i++){
					let card=document.createElement("div")
					card.classList.add("card")
					card.innerHTML+=`
						<img src="http://image.tmdb.org/t/p/w500/${load_API_Data[i].poster_path}" >
					`
					section_cards.appendChild(card)
					card.addEventListener("click",()=>{			
						let movie_series_id=load_API_Data[i].id
						let movie_series_media_type="tv"
						console.log(movie_series_id,movie_series_media_type)
						localStorage.setItem("movie_series_id",movie_series_id)
						localStorage.setItem('movie_series_media_type',movie_series_media_type)
						location.href="movieSeriesDetails.html"
					})
				}
				
				load_btn_text.innerText="Load more"
				load_btn_icon.setAttribute("hidden",true)
				load_btn.removeAttribute("disabled")			
			}
			
			let load_URL_API=fetch(`${URL}&page=${pageNo}`)
			console.log(`${URL}&page=${pageNo}`)
			load_More_Content(load_URL_API,target_series_section_cards)
			pageNo++
		})			
	}
	
	console.log(`https://api.themoviedb.org/3/discover/tv?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${e.target.value}`)
	let API_with_genres=fetch(`https://api.themoviedb.org/3/discover/tv?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${e.target.value}`)
	let URL=`https://api.themoviedb.org/3/discover/tv?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${e.target.value}`
	
	if(isNaN(e.target.value)){
		console.log(`https://api.themoviedb.org/3/discover/tv?api_key=aced4205f5abc72469db0dcfa25a10bd&with_origin_country=${e.target.value}`)
		let API_with_genres=fetch(`https://api.themoviedb.org/3/discover/tv?api_key=aced4205f5abc72469db0dcfa25a10bd&with_origin_country=${e.target.value}`)
		let URL=`https://api.themoviedb.org/3/discover/tv?api_key=aced4205f5abc72469db0dcfa25a10bd&with_origin_country=${e.target.value}`
		display_With_Genres_Series(API_with_genres,URL)
	}else{
		display_With_Genres_Series(API_with_genres,URL)
	}
			
})