const configuration = require("../config");
const MongoDBService = require("./mongodb.service");
const logger = require("../utility/logger")("FileUploadService");

module.exports = class FileService {

    constructor(){
        this.db = new MongoDBService("files");
    }

    find(parameters) {
        logger.debug("Query Params:");
        logger.debug(parameters);
        return this.db.findAll(parameters.offset, parameters.limit, parameters.sort);
    }

    download(id) {
        logger.debug("Downloading file id :" + id);
        return this.db.find(id);

    }
}