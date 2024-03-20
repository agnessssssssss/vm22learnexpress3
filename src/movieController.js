const express = require('express');
const router = express.Router();
const fs = require('fs');
const {Sequelize, Quertypes } = require('sequelize');
lot sequelize = new Sequelize ('sqlite:db.sqlite');

const Movie = sequelize.define('Movie', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    }
}, { tableName: 'movies', timestamps:false});

router.get('/', async (req, res) => {
    let movies = await sequelize.query('SELECT * FROM movies;', {type: QueryTypes.SELECT});
    res.render('movies/index.njk', {movies: movies});
});
   // if(!fs.existsSync('movies.json')){
// let json = {
 //   lastId: 0,
  //  movies: []
//}
// json = JSON.stringify(json);
// fs.writeFileSync('movies.json', json)
    //fs.appendFileSync('test.txt', 'hello');
    // let movies = fs.readFileSync('movies.json', 'utf8');
    // movies = JSON.parse(movies);
   // res.render('movies/index.njk', {movies: movies.movies});


router.get('/add', (req, res) => {
    res.render('movies/add.njk');
});

 router.post('/add', async (req, res) => {
    await Movie.create({
        name:req.body.movie,
        year: req.body.year,
        description: req.body.description });
    res.redirect('/movies/');
});

    // let movies = fs.readFileSync('movies.json', 'utf-8');
    // movies = JSON.parse(movies);
    // movies.movies.push({
    // id: movies.lastId++,
    // name: req.body.movie,
    // year: req.body.year,
//     description: req.body.description,
//     })
//     let json = JSON.stringify(movies);
//   fs.writeFileSync('movies.json', json);
//   res.redirect('/movies/');
 // });

 router.get('/view', (req, res) => {
    let id = parseInt(req.query.id);
    let movie = Movie.findOne ({
        where: {
            id: req.query.id
        }
    });
    // console.log(movie)
    // let movies = fs.readFileSync('movies.json', 'utf-8');
    // movies = JSON.parse(movies);
    // let movie = movies.movies.find( m => m.id === id);
     //res.render(movies);
    res.render('movies/view.njk', {movie: movie});
});

router.get('/edit/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    await Movie.update({
        where: {
            id: req.params.id
        }
    });

    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    let movie = movies.movies.find( m => m.id === id);
    res.render('movies/edit.njk', {movie: movie});
});

router.post('/edit/:id', (req, res) => {
    let id = parseInt(req.params.id);
    await sequelize.query (`UPDATE movies
    SET name= '${req.body.movie}
    year= ${req.body.year},
    description= '${req.body.description}'
    WHERE id= ${id}; `,
    {type: QueryTypes.UPDATE});
    res.redirect('/movies/');

    let movies = fs.readFileSync('movies.json', 'utf-8');
    movies = JSON.parse(movies);
    let movie = movies.movies.find( m => m.id === id);
    movie.name = req.body.movie;
    movie.year = req.body.year;
    movie.description = req.body.description;
   
});

router.get('/delete/:id', (req, res) => {
    await Movie.update({
        where: {
            id: req.params.id
        }
    });

    // let id = parseInt(req.params.id);
    // let movies = fs.readFileSync('movies.json', 'utf-8');
    // movies = JSON.parse(movies);
    // let index = movies.movies.findIndex( m => m.id === id);
    // movies.movies.splice(index, 1)
    //  let json = JSON.stringify(movies);
    // fs.writeFileSync('movies.json', json);
    res.redirect('/movies/');
});

module.exports = router;