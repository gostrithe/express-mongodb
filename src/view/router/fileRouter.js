const fs = require('fs');
const path = require('path');

const fileRouter = (req, res) => {
    console.log(req.files[0]);

    /* 读取上传的文件(读取数据为了拿到data数据buffer)并写入文件夹file_upload */
    // 写入路径，写到具体的文件名
    const des_file = path.resolve('file_upload') + "/" + req.files[0].originalname;
    // req.files[0].path 就是multer配置的dest的文件夹tmp，用于缓存上传的文件数据buffer
    fs.readFile(req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if (err) {
                console.log('上传失败', err);
            } else {
                const obj = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
                console.log(obj);
                res.json(obj);
            }
        });
    });
};

module.exports = fileRouter;