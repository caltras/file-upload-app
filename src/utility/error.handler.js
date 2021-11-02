module.exports = (res, err) => {
    let code = err.code;

    if (code){
        code = err.code < 200 ? 500: err.code;
    }
    res.status(code);
    res.send(err.message);
}