const axios = require("axios");
const movieRepository = require("../repositories/movies");

const search = async (request) => {
    try {

        let moviesOMDb = await axios.get(process.env.URL_API + "&s=" + request.s + "&y=" + request.year);

        const moviesAdded = moviesOMDb.data.Search.map(async element => {
            const exist = await movieRepository.exist(element);
            if (!exist) {
                const movieOMDb = await axios.get(process.env.URL_API + "&i=" + element.imdbID);
                return await movieRepository.add(movieOMDb.data);
            }
        });

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

module.exports = { search, get }