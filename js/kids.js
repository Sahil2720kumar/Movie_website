import {cards,chevron_left,chevron_right,KidsMovieDisplayFun,KidsSeriesDisplayFun} from "./module.js"


let kids_movie_popular_section=document.getElementById("kids_movie_popular_section")
let kids_movie_popular_section_cards=kids_movie_popular_section.firstElementChild.nextElementSibling
let initial_URL=`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=16`
let kidsAPI=fetch(`https://api.themoviedb.org/3/discover/movie?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=16`)
KidsMovieDisplayFun(kidsAPI,kids_movie_popular_section_cards)


//load more button.................
let initial_load_btn=document.querySelector("#load_btn")
let initial_load_btn_text=document.querySelector(".load_btn_text")
let initial_load_btn_icon=document.querySelector(".load_btn_icon")
let initial_pageNo=2

initial_load_btn.addEventListener("click",()=>{
	initial_load_btn_text.innerText="Loading..."
	initial_load_btn_icon.removeAttribute("hidden")
	initial_load_btn.setAttribute("disabled", true)
	
	async function initial_load_More_Content(load_API,section_cards){
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
		
		initial_load_btn_text.innerText="Load more"
		initial_load_btn_icon.setAttribute("hidden",true)
		initial_load_btn.removeAttribute("disabled")	
	}
	
	let load_URL_API=fetch(`${initial_URL}&page=${initial_pageNo}`)
	console.log(`${initial_URL}&page=${initial_pageNo}`)
	initial_load_More_Content(load_URL_API,kids_movie_popular_section_cards)
	initial_pageNo++
})


//==========================================================================================
// filter display movies
let kids_genres=document.querySelector(".kids_genres")
let all_section_parent=document.getElementById("all_section_parent")


kids_genres.addEventListener("change",(e)=>{
	//console.log(e.target.value)
	all_section_parent.innerHTML="";
	let kids_genre_name=e.target.value;
	let kids_genre_id=16;
	
	console.log(kids_genre_name,kids_genre_id)
	
	
	async function display_With_Genres_Series(API_with_genres,URL){
				
		all_section_parent.innerHTML=`
			<section id="target_series_section" class="">
				<h4>kids ${kids_genre_name}</h4>

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
			let kidsPopularList=data.results
			//console.log(kidsPopularList)
			
			
			
			for(let i=0;i<kidsPopularList.length; i++){
	
				let card=document.createElement("div")
				card.classList.add("card")
				card.innerHTML=`
					<img src="http://image.tmdb.org/t/p/w500/${kidsPopularList[i].poster_path}" >
				`
				section_cards.appendChild(card)
				card.addEventListener("click",()=>{			
					let movie_series_id=kidsPopularList[i].id
					let movie_series_media_type=kids_genre_name;
					console.log(movie_series_id,movie_series_media_type)
					localStorage.setItem("movie_series_id",movie_series_id)
					localStorage.setItem('movie_series_media_type',movie_series_media_type)
					location.href="movieSeriesDetails.html";
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
						let movie_series_media_type=kids_genre_name
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
	
	console.log(`https://api.themoviedb.org/3/discover/${kids_genre_name}?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${kids_genre_id}`)
	let API_with_genres=fetch(`https://api.themoviedb.org/3/discover/${kids_genre_name}?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${kids_genre_id}`)
	let URL=`https://api.themoviedb.org/3/discover/${kids_genre_name}?api_key=aced4205f5abc72469db0dcfa25a10bd&with_genres=${kids_genre_id}`
	display_With_Genres_Series(API_with_genres,URL)
})







