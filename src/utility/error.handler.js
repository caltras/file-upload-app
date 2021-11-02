module.exports = (res, err) => {
    res.status(err.code || 500);
    res.send(err.message);
}