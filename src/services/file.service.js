const logger = require("../utility/logger")("FileUploadService");
const configuration = require('../config');
const fs = require('fs');
const fsPromise = fs.promises;
const path = require("path");

module.exports = class FileService {

    constructor(mongoDbService) {
        this.db = mongoDbService;
        this.monitoring = this.monitorDirectory();
    }

    monitorDirectory() {
        if (configuration.file.monitoring){
            logger.debug("Monitoring folder " + configuration.upload.destinationFolder);
            const self = this;
            if (!this.monitoring){
                fs.watch(configuration.upload.destinationFolder, (e, filename) => {
                    if (e === 'rename') {
                        self.delete(filename)
                            .then( r => logger.debug("Deleted data for " + filename))
                            .catch(e => logger.error("Error to delete data for "+filename + ":"+JSON.stringify(e)));
                    }
                });
            }
            return true;
        }
        return false;
    }

    async checkDirectory() {
        if (configuration.file.monitoring) {
            const results = await this.find({limit:-1});
            results.toArray( (e, v) => {
                if (e) {
                    logger.debug(JSON.stringify(e));
                    return;
                }
                v.forEach( (r) => {
                    const filePath = r.path + path.sep + r.name;
                    fsPromise.stat(filePath)
                        .catch((e) => {
                            logger.debug("File "+ r.name+ "doesn't exist on directory. Deleting on DB");
                            this.delete(r.name)
                                .then(d=> logger.debug("Data deleted. File(name:'" + r.name+"')"))
                                .catch( (err) => logger.error(JSON.stringify(err)));
                        });
                });
            });
        }
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

    delete(filename) {
        logger.debug("Deleteing all records where filename is " + filename);
        return this.db.deleteAll({name: filename});
    }
}