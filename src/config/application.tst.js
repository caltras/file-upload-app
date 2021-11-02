const path = require("path");

module.exports = {
    upload: {
        destinationFolder: path.resolve(__dirname,"../../__tests__"),
        accepts: [".tgz"],
        maxSize: 25 * 1000 * 1000 * 1000
    },
    log: {
        level: "INFO",
        
        provider:{
            name: "console.logger.js"
        },
        
    }
}