const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
    },
    Year: {
        type: String,
    },
    Released: {
        type: String,
    },
    Genre: {
        type: String,
    },
    Director: {
        type: String,
    },
    Actors: {
        type: String,
    },
    Plot: {
        type: String,
    },
    Ratings: {
        type: Array,
    },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;

