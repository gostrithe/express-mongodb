const mongoDB = require('../model/mongoDB');
const JWT = require('../utils/jsonWebToken');

const collectionName = 'user';

const register = async (user) => {
    const { username, password } = user;
    // 拿着username，去数据库中查找。
    const resultArr = await mongoDB.RETRIEVE(collectionName, { username });

    // 判断查询结果里面有没有查询配置，username的内容
    if (!resultArr.length) { // 没有就注册
        const insertOneResult = await mongoDB.CREATE(collectionName, user);
        console.log(insertOneResult);
        console.log('注册成功');
        return '注册成功';
    } else {
        console.log('注册失败：用户名被占用');
        return '注册失败：用户名被占用';
    }
};

const login = async (user) => {
    const { username, password } = user;

    // 去数据库中查找是否有{ username, password }对应的用户
    const resultArr = await mongoDB.RETRIEVE(collectionName, { username, password });

    // 有就是用户名和密码正确
    // const result = resultArr.length ? '登录成功' : '用户名或密码错误';
    if (resultArr.length) {
        const result = {
            massege: '登录成功'
        };
        // 登录成功后，给客户端发一个token JWT
        /* 
            这个令牌作为后续用户访问一些接口的凭证
            后续访问会根据这个令牌判断用户是否有权限进行访问
        */
        let token = JWT.generate({ username, password, admin: resultArr[0].admin }, "100s");  // 载荷payload中存了用户名密码和是否为管理员
        console.log(token);
        token = 'Bearer ' + token;

        // 往result对象中添加token属性 // 返回result的地址
        return Object.assign(result, { token });
    } else {
        return '用户名或密码错误';
    }
};

module.exports = {
    register,
    login
};