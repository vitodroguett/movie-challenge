const axios = require("axios");
const movieRepository = require("../repositories/movies");

const search = async (request) => {
    try {

        let moviesOMDb = await axios.get(process.env.URL_API + "&s=" + request.s + "&y=" + request.year);

        const moviesAdded = await Promise.all(moviesOMDb.data.Search.map(async element => {
            const exist = await movieRepository.exist(element);
            if (!exist) {
                const movieOMDb = await axios.get(process.env.URL_API + "&i=" + element.imdbID);
                const movie = await movieRepository.add(movieOMDb.data);
                return movie;
            }
        }));

        return moviesAdded;

    } catch (error) {
        console.error(error);
    }
}

const get = async (request) => {
    try {
        const movies = await movieRepository.get(request);
        return movies;
    } catch (error) {
        console.error(error);
    }
}

const replace = async (request) => {
    try {
        const movie = await movieRepository.findLike(request);
        if (movie) {
            const searchRegExp = new RegExp(request.find, "gi");
            const replaceWith = request.replace;
            console.log(movie.Plot.replace(searchRegExp, replaceWith));
            return movie.Plot.replace(searchRegExp, replaceWith);
        }
        return "";
    } catch (error) {
        console.error(error);
    }
}

module.exports = { search, get, replace }