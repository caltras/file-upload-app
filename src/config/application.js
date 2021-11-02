module.exports = {
    upload: {
        destinationFolder: "/tmp/uploads",
        accepts: [".tgz"],
        maxSize: 25 * 1000 * 1000 * 1000
    },
    db: {
        url: 'mongodb://localhost:27017'
    },
    log: {
        level: "ERROR",
        // provider : {
        //     name: "elasticsearch.logger.js",
        //     host: "http://localhost:9200"    
        // }
        // provider:{
        //     name: "console.logger.js"
        // },
        provider : {
            name: "mongodb.logger.js",
            host: "mongodb://localhost:27017"
        }
        
    }
}