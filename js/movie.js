import {cards,chevron_left,chevron_right,movieDisplayFun} from "./module.js"

console.log("working....")
addEventListener("load", function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})

// movie fetching started.............

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

// filter option=====================

async function genre_Display_Fun(API_genre){
	let response=await API_genre
	let genre_list=await response.json()
	console.log(genre_list)
	
	for(let i=0; i<genre_list.genres.length; i++){
		movie_genres.innerHTML+=`
			<option  value="${genre_list.genres[i].id}" >${genre_list.genres[i].name}</option>
		`
		
	}
	
	
}


let movie_genres=document.querySelector(".movie_genres")
let API_genre=fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=aced4205f5abc72469db0dcfa25a10bd`)
genre_Display_Fun(API_genre)

// filter display movies
let all_section_parent=document.getElementById("all_section_parent")


movie_genres.addEventListener("change",(e)=>{
	//console.log(e.target.value)
	all_section_parent.innerHTML="";
	let movie_genre_name;
	
	for(let i=0; i<e.target.length; i++){
		if(e.target.value===e.target[i].value){
			movie_genre_name=e.target[i].text
		}		
	}
	console.log(movie_genre_name)
	
	
	async function display_With_Genres_Movie(API_with_genres,URL){
				
		all_section_parent.innerHTML=`
			<section id="target_movie_section" class="">
				<h4>${movie_genre_name} Movies </h4>

				<div class="cards"  >
												
				</div>
				<button id="load_btn" style="" class="btn" type="button">
					<span hidden="true" class="spinner-border spinner-border-sm load_btn_icon" role="status" aria-hidden="true"></span>
					<span class="load_btn_text" >Load more</span>
					
				</button>
			</section>	
		`
		
		async function targetmovieDisplayFun(API,section_cards){
			section_cards.innerHTML=""
			
			const response=await API
			const data=await response.json()
			let moviePopularList=data.results
			//console.log(moviePopularList)
			
			
			
			for(let i=0;i<moviePopularList.length; i++){
	
				let card=document.createElement("div")
				card.classList.add("card")
				card.innerHTML=`
					<img src="http://image.tmdb.org/t/p/w500/${moviePopularList[i].poster_path}" >
				`
				section_cards.appendChild(card)
				card.addEventListener("click",()=>{			
					let movie_series_id=moviePopularList[i].id
					let movie_series_media_type="movie"
					console.log(movie_series_id,movie_series_media_type)
					localStorage.setItem("movie_series_id",movie_series_id)
					localStorage.setItem('movie_series_media_type',movie_series_media_type)
					location.href="movieSeriesDetails.html"
				})
			}
		}
		
		
		
		let target_movie_section=document.getElementById("target_movie_section")
		let target_movie_section_cards=target_movie_section.firstElementChild.nextElementSibling
		targetmovieDisplayFun(API_with_genres,target_movie_section_cards)
		
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
						let movie_series_media_type="movie"
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
			load_More_Content(load_URL_API,target_movie_section_cards)
			pageNo++
		})			
	}
	
	console.log(`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${e.target.value}`)
	let API_with_genres=fetch(`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${e.target.value}`)
	let URL=`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${e.target.value}`
	
	if(isNaN(e.target.value)){
		console.log(`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_origin_country=${e.target.value}`)
		let API_with_genres=fetch(`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_origin_country=${e.target.value}`)
		let URL=`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_origin_country=${e.target.value}`
		display_With_Genres_Movie(API_with_genres,URL)
	}else{
		display_With_Genres_Movie(API_with_genres,URL)
	}
})