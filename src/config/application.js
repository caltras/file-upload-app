module.exports = {
    upload: {
        destinationFolder: "/tmp/uploads",
        accepts: [".tgz"],
        maxSize: 25 * 1000 * 1000 * 1000
    },
    db: {
        url: process.env.DB_HOST || 'mongodb://localhost:27017'
    },
    log: {
        level: "ERROR",
        
        // Use Elasticsearch as log provider
        /*provider : {
            name: "elasticsearch.logger.js",
            host: "http://localhost:9200"    
        }*/
        
        // Use console as log provider
        /*provider:{
            name: "console.logger.js"
        },*/

        // Use mongodb as log provider
        provider : {
            name: "mongodb.logger.js",
            host: "mongodb://localhost:27017"
        }
        
    }
}