export let cards=document.getElementsByClassName("cards")
export let chevron_left=document.getElementsByClassName("chevron-left")
export let chevron_right=document.getElementsByClassName("chevron-right")



export async function movieDisplayFun(API,section_cards){
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
			let movie_series_id=moviePopularList[i].id
			let movie_series_media_type="movie"
			console.log(movie_series_id,movie_series_media_type)
			localStorage.setItem("movie_series_id",movie_series_id)
			localStorage.setItem('movie_series_media_type',movie_series_media_type)
			location.href="movieSeriesDetails.html"
		})
	}
}

export async function SeriesDisplayFun(API,section_cards){
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
			let movie_series_id=moviePopularList[i].id
			let movie_series_media_type="tv"
			console.log(movie_series_id,movie_series_media_type)
			localStorage.setItem("movie_series_id",movie_series_id)
			localStorage.setItem('movie_series_media_type',movie_series_media_type)
			location.href="movieSeriesDetails.html"
		})
	}
}

export async function KidsMovieDisplayFun(API,section_cards){
	section_cards.innerHTML=""
	
	const response=await API
	const data=await response.json()
	let moviePopularList=data.results
	console.log(moviePopularList)
	
	
	
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
	return moviePopularList;
}


export async function KidsSeriesDisplayFun(API,section_cards){
	section_cards.innerHTML=""
	
	const response=await API
	const data=await response.json()
	let seriesPopularList=data.results
	//console.log(seriesPopularList)
	
	
	
	for(let i=0;i<seriesPopularList.length; i++){
		let series_genre_arr=[]
		let series_genre;
		series_genre=await fetch(`https://api.themoviedb.org/3/tv/${seriesPopularList[i].id}?api_key=aced4205f5abc72469db0dcfa25a10bd`)	
		series_genre=await series_genre.json()
		
		for(let i=0; i<series_genre.genres.length; i++){
			series_genre_arr[i]=series_genre.genres[i].name				
		}
		series_genre_arr.length=2
		
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