const logger = require("../utility/logger")("AuthMiddleware");
const configuration = require('../config');

module.exports = () =>{
    return (req, res, next) =>{
        logger.debug("Authorizing");
        const token = req.headers["authorization"];
        if (configuration.authentication.token === token) {
            logger.debug("Token authorized.");
            next();
        } else {
            logger.debug("The token is not valid " + token)
            res.status(403);
            res.send("Access denied.");
        }
        
    }
}