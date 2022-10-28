const express = require('express');
const path = require('path');

const {register, login} = require('../../controller/userController')

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

    // 响应等来的结果
    res.json(result);
});

router.get('/login', (req, res) => {
    res.send(`
    <form action="/user/login" method="post">
        用户名：<input type="text" name="username"><br>
        密码<input type="password" name="password"><br>
        <input type="submit" value="登录">
    </form>`
    );
});

router.post('/login', async (req, res) => {
    // 拿到post上来的数据，交给控制层写逻辑
    const result = await login(req.body);

    // 响应等来的结果
    /* 客户端拿到token，缓存在localStorage中 */
    res.send(`
        <h1>${result.massege || result}</h1>

        ${
            result.massege == '登录成功' ? 
            `电影名：<input id="mname" type="text" name="name"><br>
            导演<input id="director" type="text" name="director"><br>
            <input id="addBtn" type="submit" value="添加">
            <a href="/movie/all">查询全部电影</a>`
            :
            `<div></div>`
        }
        
        <script>
            const token = '${result.token}';
            console.log(token)
            
            localStorage.setItem('token', token);
        </script>

        <script>
            addBtn.onclick = () => {
                const xhr = new XMLHttpRequest();
                const data = {
                    "name": mname.value,
                    "director": director.value
                };
                const token = localStorage.getItem('token');
                xhr.open('POST', '/movie/add');
                xhr.setRequestHeader('authorization', token);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        </script>
    `);
});

module.exports = router;