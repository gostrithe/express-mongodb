const process_get = (req, res) => {
    const response = {
        "first_name": req.query.first_name,  // 与表单上的name有关，绑定name拿到value
        "last_name": req.query.last_name
    };
    console.log(response);

    res.end(JSON.stringify(response));
    // res.json(response)
};

module.exports = {
    process_get
};