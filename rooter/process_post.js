
const fs = require('fs');
const path = require('path');

const process_post = (req, res) => {
    console.log(req.files);
    console.log(req.files[0].path);

    const des_file = path.resolve() + '/public/img/' + req.files[0].originalname;
    fs.readFile(req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                response = {
                    massage: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.json(response);
        });
    });
};

module.exports = {
    process_post
};