const mongoDB = require('../model/mongoDB');

const collectionName = 'movie';

const add = async (movie) => {
    const { name, director } = movie;
    const resultArr = await mongoDB.RETRIEVE(collectionName, { "name": name, "director": director });
    if (!resultArr.length) {
        console.log('添加电影成功');
        return mongoDB.CREATE(collectionName, movie);
    } else {
        console.log('该电影已经存在');
        return '该电影已经存在';
    }
};

const deleteMovie = async (movieId) => {
    const { name, director } = movie;
    const resultArr = await mongoDB.RETRIEVE(collectionName, { "name": name, "director": director });
    if (resultArr.length) {
        console.log('删除电影成功');
        return mongoDB.DELETE(collectionName, movieId);
    } else {
        console.log('该电影不存在');
        return '该电影不存在';
    }
};

module.exports = {
    add,
    deleteMovie
};