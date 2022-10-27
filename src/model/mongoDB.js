/* mongoDB的增删改查CRUD */
const MongoClient = require('mongodb').MongoClient;  // MongoDB客户端实例
// 连接MongoDB部署的url, 连接到客户端的url
const URL = 'mongodb://localhost:27017';
const dbName = 'my-server';


async function getCollection(dbName, collectionName) {
    return MongoClient.connect(URL)  // 连接到客户端
        .then(
            client => {
                console.log('连接数据库成功');
                // 拿到客户端的my-server数据库
                const db = client.db(dbName);
                // 应用数据库中user集合
                const collection = db.collection(collectionName);
                return {
                    collection,
                    client
                };
            },
            err => {
                console.log('连接数据库失败', err);
                return err;
            }
        );
}


// Create 在哪个collection中add data
async function CREATE(collectionName, data) {
    return getCollection(dbName, collectionName)
        .then(
            ({ collection, client }) => collection.insertOne(data)
                .then(
                    insertOneResult => {
                        console.log('集合添加数据成功');
                        return insertOneResult;
                    },
                    err => {
                        console.log('集合添加数据失败');
                        return err;
                    }
                ).finally(
                    client.close()
                )
        ).catch(
            err => err
        );
}
// RETRIEVE
async function RETRIEVE(collectionName, whereOptions) {
    return getCollection(dbName, collectionName)
        .then(
            ({ collection, client }) => collection.find(whereOptions).toArray()
                .then(
                    arr => {
                        console.log('查询数据库成功', arr);
                        return arr;
                    },
                    err => {
                        console.log('查询数据库失败', err);
                        return err;
                    }
                ).finally(
                    client.close()
                )
        ).catch(
            err => err
        );


}
// UPDATE
function UPDATE(params) {

}
// DELETE
function DELETE(params) {

}

module.exports = {
    CREATE,
    RETRIEVE,
    UPDATE,
    DELETE
};