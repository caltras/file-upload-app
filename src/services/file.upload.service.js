const configuration = require("../config");
const multer = require("multer");
const FileModel = require("../model/file.model");
const logger = require("../utility/logger")("FileUploadService");
const fs = require("fs");
const { replaceSpecialCharacters } = require('../utility/string.util');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        if (!fs.existsSync(configuration.upload.destinationFolder)) {
            fs.mkdirSync(configuration.upload.destinationFolder, { recursive: true});
        }

        cb(null, configuration.upload.destinationFolder)
    },
    filename: function (req, file, cb) {
        cb(null, replaceSpecialCharacters(file.originalname));
    }
});


module.exports = class FileUploadService {

    constructor(mongoDBService) {
        this.upload = multer({
            storage: storage,
            limits: { fileSize: configuration.upload.maxSize },
            fileFilter: function (req, file, cb) {
                const name = file.originalname.split(".");
                const allowedExtensions = configuration.upload.accepts;
                if (allowedExtensions.indexOf("." + name[name.length - 1]) === -1) {
                    const error = "File is not allowed. This API only accepts `" + allowedExtensions.toString() + "`";
                    cb({ code: 503, message: error }, false);
                } else {
                    cb(null, true);
                }
            }
        }).any();
        this.db = mongoDBService;
    }

    processFile(req, res) {
        const self = this;
        return new Promise(async (resolve, reject) => {
            logger.debug("Uploading file...")
            self.upload(req, res, async (err) => {
                logger.debug("Uploaded");
                if (err) {
                    reject(err);
                } else {
                    if (req.files && req.files.length > 0) {
                        try {
                            await this.saveFileDB(req.files);
                            resolve({ code: 200, message: "File Uploaded" });
                        } catch (e) {
                            reject({ code: 503, message: e.message });
                        }
                    } else {
                        reject({ code: 503, message: "No file uploaded" });
                    }

                }
            });
        });
    }

    async saveFileDB(files) {
        logger.debug("Saving files on db");
        let results = await this.db.saveMany(files.map(f => new FileModel(f)));
        logger.debug(results);
    }


};