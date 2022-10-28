const express = require('express');
const { ObjectId } = require('mongodb');
const mongoDB = require('../model/mongoDB');


/* 路由生成器 */
// 他的实例暴露了增删改查接口
class RouterGenerator {
    // 使用静态方法，生成一个实例，且在属性中储存放进来的集合名字
    static from(collectionName) {
        return Object.assign(
            new RouterGenerator(),  // 拿到实例对象，只有一个generate()方法
            { collectionName: collectionName }  // 在实例中添加属性，后续this.访问
        );
    }

    // 实例调用方法，生成路由器且分配接口
    generate() {
        const router = express.Router();

        router.post('/0', async (req, res) => {
            const result = await mongoDB.CREATE(this.collectionName, req.body);
            res.json(result);
        });

        router.delete('/:id', async (req, res) => {
            const result = await mongoDB.DELETE(this.collectionName, req.params.id);
            res.json(result);
        });

        router.put('/:id', async (req, res) => {
            const result = await mongoDB.UPDATE(this.collectionName, req.params.id, req.body);
            res.json(result);
        });

        router.get('/0', async (req, res) => {
            const result = await mongoDB.RETRIEVE(this.collectionName, {});
            res.json(result);
        });

        router.get('/:id', async (req, res) => {
            const result = await mongoDB.RETRIEVE(this.collectionName, { _id: new ObjectId(req.params.id) });
            res.json(result);
        });

        return router;
    }
}


module.exports = RouterGenerator

