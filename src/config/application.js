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
        provider:{
            name: "console.logger.js"
        },

        // Use mongodb as log provider
        // provider : {
        //     name: "mongodb.logger.js",
        //     host: "mongodb://localhost:27017"
        // }
        
    },
    authentication:{
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNsYXVkaW8iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjM1OTA5MjQ3LCJleHAiOjE2MzU5MTI4NDd9.ZQFy6bVIBtWGmSZD_fnmlS16y2xCCv0q8QjcODWsyPQ"
    },
    file: {
        monitoring: true
    }
}