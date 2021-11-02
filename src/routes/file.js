
const errorHandler = require("../utility/error.handler");
const logger = require("../utility/logger")("FileRouter");

const express = require("express");
const router = new express.Router();
// const FileUploadService = require("../services/file.upload.service");
// const FileService = require("../services/file.service");
// const fileUploadService = new FileUploadService();
// const fileService = new FileService();
const fs = require("fs");
const path = require('path')

module.exports = (fileService, fileUploadService) =>{

    router.get("/", (req, res, next) => {
        fileService.find(req.query).then(results => {
            logger.debug("Results:");
            results.toArray((err, r) => {
                console.log(r);
                if (err) {
                    res.status = 500;
                    res.json(err.message);
                } else {
                    res.json(r);
                }
            });
        }).catch(e => {
            logger.error(JSON.stringify(e));
            errorHandler(res, e);
        });

    });

    router.post("/", (req, res, next) => {
        logger.debug("Processing files.");
        fileUploadService.processFile(req, res)
            .then((result) => {
                logger.debug("Files processed");
                res.status(result.code);
                res.json(result);
            })
            .catch((err) => {
                logger.error("Error processing files.");
                logger.error(JSON.stringify(err));
                errorHandler(res, err)
            });
    });


    router.get("/download/:id", (req, res, next) => {
        fileService.download(req.params.id).then(result => {
            const filePath = result.path + path.sep + result.name;
            if (fs.existsSync(result.path + path.sep + result.name)) {
                res.status(200);
                res.download(filePath);
            } else {
                errorHandler(res, {code:404, message: "File not found on repository."});
            }
        }).catch(e => {
            logger.error(JSON.stringify(e));
            errorHandler(res, e);
        });

    });
    return router;
}
//module.exports = router;