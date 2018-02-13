const express = require('express')
const app = express()
const port = process.argv[2] || 8080
const api = `d706a7b45b225a06e23296584454ba57`
const request = require("request");
const axios = require('axios')
const movieIndex = {
    method: 'GET',
    url: 'https://api.themoviedb.org/4/list/3945',
    qs: { api_key: `${api}`, page: '1' },
    headers:
        {
            authorization: 'Bearer <<access_token>>',
            'content-type': 'application/json;charset=utf-8'
        },
    body: {},
    json: true
};

app.use(express.static('public'))
app.set('view engine', 'ejs')

request(movieIndex, function (error, response, body) {
    if (error) throw new Error(error);

    app.get('/', (req, res) => {
        let startUpPage = body.results
        console.log(body.results)
        res.render('index', { startUpPage })
    })
});

request(movieIndex, function (error, response, body) {
    if (error) throw new Error(error);

    app.get('/movie/:movieId', (req, res) => {
        let movieTitle = req.params.movieId
        let movieAttr = {}

        for (let i = 0; i < body.results.length; i++) {
            if (movieTitle === body.results[i].title) {
                movieAttr = body.results[i]
            }
        }
        res.render('movie', { movieAttr })
    })
});

request(movieIndex, function (error, response, body) {
    if (error) throw new Error(error);

    let foundMovie = {}

    app.get('/search', (req, res) => {
        let searchedMovie = req.query.searchTerm
        let movieList = {}
        for (let i = 0; i < body.results.length; i++) {
            if (body.results[i].title.toLowerCase().includes(searchedMovie.toLowerCase())) {
                movieList = body.results[i]
            }
        }

        res.render('searchMovie', { movieList })
    })
});

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}.`)
})