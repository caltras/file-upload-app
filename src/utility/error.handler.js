const http = require("http");

module.exports = (res, err) => {
    let code = err.code;

    if (code){
        code = !http.STATUS_CODES[err.code]? 500: err.code;
    }
    res.status(code);
    res.send(err.message);
}
