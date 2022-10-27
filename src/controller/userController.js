const mongoDB = require('../model/mongoDB');
const collectionName = 'user';

const register = async (user) => {
    const { username, password } = user;
    // 拿着username，去数据库中查找。
    const resultArr = await mongoDB.RETRIEVE(collectionName, { username });
    console.log(1, resultArr);

    // 判断查询结果里面有没有查询配置，username的内容
    if (!resultArr.length) { // 没有就注册
        const insertOneResult = await mongoDB.CREATE(collectionName, user);
        return insertOneResult;
    } else {
        return '注册失败：用户名被占用'
    }
};

module.exports = {
    register
};