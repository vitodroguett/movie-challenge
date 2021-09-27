const MovieModel = require("../models/movie");


const add = async (params) => {
    try {
        const movie = new MovieModel(params);
        return await movie.save();
    } catch (error) {
        console.error(error);
    }
}

const exist = async (params) => {
    try {
        const exist = await MovieModel.exists({ imdbID: params.imdbID });
        return exist;
    } catch (error) {
        console.error(error);
    }
}

const get = async (params) => {
    try {
        const total = await MovieModel.count();
        let pag_by = 5;
        if (total > pag_by) {
            const limit = pag_by * (!isNaN(params.page) ? params.page : 1);
            const skip = limit - pag_by;
            const movies = await MovieModel.find().skip(skip).limit(limit);
            return { movies, total, page: params.page };

        } else {
            return movies;
        }
    } catch (error) {
        console.error(error);
    }
}

const findLike = async (params) => {
    return await MovieModel.findOne({ Title: { $regex: '.*' + params.movie + '.*' } }).limit(1);
}

module.exports = { add, exist, get, findLike }