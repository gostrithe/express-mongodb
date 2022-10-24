const express = require('express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;

const multer = require('multer');

const { process_get } = require('../rooter/process_get');
const { process_post } = require('../rooter/process_post');

// Creates an Express application.
const expressApp = express();
//访问/接口发送get请求，执行回调，发送响应
// Send a response.
expressApp.get('/', (request, response) => { response.send('hello, express!'); });

//使用内置中间件  根据请求头Content-Type解析编码匹配响应体类型
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(multer({ dest: 'D:/桌面/express-mongoDB/express-mongodb-server/tmp' }).array('image'));


/* 路由 */
// 路由决定了由谁(指定脚本)去响应客户端请求。
expressApp.get('/index.html', (req, res) => {
    // res.sendFile('D:\\桌面\\express-mongoDB\\express-mongodb-server\\index.html');
    res.sendFile(path.resolve() + '/index.html');
});
expressApp.get('/process_get', process_get);

expressApp.post('/process_post', process_post);


expressApp.get('/list_user', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1 style="color: green;">Cannot GET${req.path}</h1>
    </body>
    </html>`);
});

// 设置静态文件
// 使用 express.static 中间件来设置静态文件路径。
// use使用中间件，访问/public接口时，交给内置中间件express.static('public')处理
// 一行代码就解决 处理静态文件的功能 输入网址即可访问到公共资源
expressApp.use('/public', express.static('public'));



// A node http.Server is returned
const nodeHttpServer = expressApp.listen(8001, () => {
    const host = nodeHttpServer.address().address;  // 服务器ip地址，主机
    const port = nodeHttpServer.address().port;  // 端口
    console.log(`应用实例，访问地址为 http://${host}:${port}`);
    console.log('opened server on', nodeHttpServer.address());
});