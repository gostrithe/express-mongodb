const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'pages', 'register&login.html'));
});

router.get('/register', (req, res) => {
    res.send(`
    <form action="/user/register" method="post">
        用户名：<input type="text" name="username"><br>
        密码<input type="password" name="password"><br>
        <input type="submit" value="注册">
    </form>`
    );
});

router.post('/register', async (req, res) => {
    // console.log(req.body);
    // 拿到post上来的数据，交给控制层写逻辑
    const result = await register(req.body);

    res.json(result);
});

router.get('/login', (req, res) => {

});

module.exports = router;