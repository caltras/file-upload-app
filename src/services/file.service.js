const configuration = require("../config");
//const MongoDBService = require("./mongodb.service");
//const MongoDBService = require("../../mocks/mongodb.fake");
const logger = require("../utility/logger")("FileUploadService");

module.exports = class FileService {

    constructor(mongoDbService){
        this.db = mongoDbService;//new MongoDBService("files");
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