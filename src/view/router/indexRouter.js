const { Router } = require('express');
const express = require('express');

const path = require('path')

// 创建路由器实例router
const router = express.Router();

/* 添加路由处理 */
router.get('/', (req, res) => {
    res.send('<h1>Hello, JACK!</h1>');
});
router.get('/test.html', (req, res) => {
    res.sendFile(path.resolve() + '\\test.html');
});

// 直接把路由router实例返出去就行 这里router => 中间键
module.exports = router;