module.exports = (res, err) => {
    res.status((err.code && err.code < 200)  || 500);
    res.send(err.message);
}