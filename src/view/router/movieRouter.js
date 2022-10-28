const express = require('express');
const mongoDB = require('../../model/mongoDB');
const adminCheck = require('../../myMiddleWare/adminCheck');
const { add, deleteMovie } = require('../../controller/movieController');

const router = express.Router();

const collectionName = 'movie';

/* 添加电影 */
router.post('/add', adminCheck, async (req, res) => {
    const movie = req.body;
    const result = await add(movie);
    res.json(result);
});

/* 删除某条电影 */
// movie/635aaa16351dd98d52a8ef1d  RESTful风格的后端接口
// 动态接口
router.delete('/:id', adminCheck, async (req, res) => {
    // 拿到路由上的动态id
    const movieId = req.params.id;

    const result = await deleteMovie(movieId)
    res.json(result);
});

/* 修改某条电影 */
router.put('/:id', adminCheck, async (req, res) => {
    const movieId = req.params.id;
    const movie = req.body;
    const result = await mongoDB.UPDATE(collectionName, movieIdm, movie);
    console.log('更新成功');
    res.json(result);
});

/* 查询全部电影 */
router.get('/all', async (req, res) => {
    const result = await mongoDB.RETRIEVE(collectionName, {});
    console.log('查询成功');
    res.json(result);
});




module.exports = router


