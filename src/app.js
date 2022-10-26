const express = require('express');
const multer = require('multer');

// 导入nodejs工具模块
const path = require('path');

// 导入子模块routers
const indexRouter = require('./view/router/indexRouter');
const userRouter = require('./view/router/userRouter');
const fileRouter = require('./view/router/fileRouter');

// Creates an Express application. 
const app = express();
/* 配置中间件 */
// only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());
// only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: false }));
// 处理静态资源
// 如http://127.0.0.1:8001/img/huya.webp 即可直接访问到资源
app.use(express.static(path.resolve('public')));  //D:\桌面\express-mongoDB\express-mongodb-server\public
// 上传文件
app.use(multer({ dest: path.resolve('tmp') }).array('aFieldName'));  //array里面的字段必须与上传文件input框的name字段一致
// 路由派发
app.use('/', indexRouter);
app.use('/user', userRouter);
app.post('/file_upload', fileRouter);

// 将应用实例app挂载监听在8002端口
const server = app.listen(
    8001,
    () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log('listening at %s:%s', host, port);
    }
)


