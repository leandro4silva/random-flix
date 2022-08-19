import {API_KEY, BASE_URL, IMG_URL, language} from './api.js'

export class TheMovie{
    static search(id){
        const endpointMovie = `${BASE_URL}/${id}?${API_KEY}&${language}`

        return fetch(endpointMovie).then((movie) => movie.json()).then(({title, overview, poster_path}) => ({
            title,
            overview,
            poster_path
        }))

    }
}

export class Indication {
    constructor(root) {
        this.root = document.querySelector(root)
    }

    load(){
        this.entry =
        {
            "title": "Clube da Luta",
            "overview": `Um homem deprimido que sofre de insônia conhece um estranho vendedor de sabonetes chamado Tyler Durden. 
                Eles formam um clube clandestino com regras rígidas onde lutam com outros homens cansados de suas vidas mundanas. 
                Mas sua parceria perfeita é comprometida quando Marla chama a atenção de Tyler.`,
            "poster_path": "https://image.tmdb.org/t/p/w500/r3pPehX4ik8NLYPpbDRAh0YRtMb.jpg"
        }
    }

    async findMovie(){
        const randomId = this.getRandomId()
        const movie = await TheMovie.search(randomId)

        if(movie.title == undefined || movie.overview == undefined || movie.poster_path == undefined){
            this.entry = null
        }else{
            this.entry = movie
        } 
        
        this.update()
    }

    getRandomId(){
        return (Math.random() * (800 - 400) + 400).toFixed(0);
    }

}

export class IndicationView extends Indication {
    constructor(root) {
        super(root)
        this.content = document.querySelector('.content')
        this.load()
        this.onFindMovie()
    }

    update() {

        if(this.entry == null){
            this.removeContentMovieDetails()
            this.removeContentLetsCode()
            const letsCode = this.createContentLetsCode()
            this.content.append(letsCode)
        }else{
            this.removeContentLetsCode()
            this.removeContentMovieDetails()
            const movieDetails = this.createContentMovieDetails()
        
            movieDetails.querySelector('.poster').src = `${IMG_URL}/${this.entry.poster_path}`
            movieDetails.querySelector('.title').textContent = this.entry.title
            movieDetails.querySelector('.overview').textContent = this.entry.overview
            
            this.content.append(movieDetails)
        }

    }

    onFindMovie(){
        const buttonFindMovie = document.querySelector('#find-movie')

        buttonFindMovie.onclick = () =>{
            this.findMovie()
        } 
    }

    createContentLetsCode(){
        const letsCode = this.createElement('div', 'lets-code')


        letsCode.innerHTML = `
        <img class="poster" src="./assets/image/Poster.png"
        alt="Imagem de um caderno com um monitor ao fundo com codigos de programação">
        <h2 class="title">Ops, hoje não é dia de assistir filme.
          Bora codar! 🚀</h2>
        `

        return letsCode
    }

    createElement(elementName, className){
        const element = document.createElement(elementName)
        element.classList.add(className)

        return element
    }

    createContentMovieDetails() {
        const movieDetails = this.createElement('div','movie-details' )

        movieDetails.innerHTML = `
        
        <img class="poster" src="https://image.tmdb.org/t/p/w500/r3pPehX4ik8NLYPpbDRAh0YRtMb.jpg"
          alt="Poster de Clube da luta">

        <div class="description">
          <h2 class="title">Clube da Luta</h2>
          <p class="overview">
            Um homem deprimido que sofre de insônia conhece um estranho vendedor de sabonetes chamado Tyler Durden.
            Eles
            formam um clube clandestino com regras rígidas onde lutam com outros homens cansados de suas vidas
            mundanas.
            Mas sua parceria perfeita é comprometida quando Marla chama a atenção de Tyler.
          </p>
        </div>
      
        `
        return movieDetails
    }

    removeContentMovieDetails() {
        const movieDetails = document.querySelector('.content .movie-details')
        if(movieDetails != null){
            movieDetails.remove()
        }
    }

    removeContentLetsCode(){
        const letsCode = document.querySelector('.content .lets-code')
        if(letsCode != null){
            letsCode.remove()
        }
    }
}


