const JWT = require("../utils/jsonWebToken");
/* 判断是否为管理员 封装成中间件，在路由处理之前判断 */
// middleWare = (req, res, next)



// token正则，用于分组提取token字符串（不包括Bearer ）
const tokenReg = /Bearer (.*)/;

const getToken = (req) => {
    let token = req.headers['authorization'];

    if (token) {
        token = tokenReg.exec(token)[1];
    }
    return token;
};

// 判断是否为管理员
const isAdmin = (token) => {
    const payload = JWT.verify(token); // 这里检验过程出错会返回false
    /* 其实就是拿到客户端带过来的token字符串，用之前设置的秘钥const jwtSecret = 'jack_test_key'转回载荷 */
    console.log(payload);

    if (!payload) {
        return false;
    }
    return payload['admin'];  // 返回admin字段，管理员的admin字段会设置为true。如果是管理员，即返回true
};

const adminCheck = (req, res, next) => {
    const token = getToken(req);


    if (isAdmin(token) === true) {
        next();  // 管理员有权限，直接跳到下一个中间件
    } else {
        /* 不是管理员，则直接响应，切断后面的中间件链条 */
        res.json('您的权限不足！')
    }
};

module.exports = adminCheck