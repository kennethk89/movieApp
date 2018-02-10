const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')


app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




app.get('/', (req, res)=>{
    res.render('index', { movies: getMovies() })
})

app.get('/movie/:movieId', (req, res)=>{
    let i = req.params.movieId
    res.render('movie', { moviesId: getMovies() , i})
})

app.post('/search', (req, res) => {
    let searchTerm = req.body.searchTerm

    let movieList = getMovies()
    let foundMovie = ''

    for (let i=0; i<movieList.length; i++){
        if (searchTerm == movieList[i].title){
            foundMovie = movieList[i]
        }
    }

    res.render('searchMovie', { foundMovie })
})




function getMovies() {
    return [{
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        language: 'English',
        country: 'USA, Hong Kong'
    },
    {
        title: 'Osmosis',
        year: '1724',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'The process in water molucules move from an area of higher concentration to a lower concentration through a partially permeable membrane.',
        language: 'English',
        country: 'USA, Hong Kong'
    },
    {
        title: 'Periodic Table',
        year: '1833',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'This super table of elements that we, humans, have discovered. Kids as young as 13 are made to memorize the first 20 elements by hard.',
        language: 'English',
        country: 'USA, Hong Kong'
    }]
}

app.listen(port,(req, res)=>{
    console.log(`Listening on port ${port}.`)
})