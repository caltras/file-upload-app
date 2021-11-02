const configuration = require("../config");
const elasticsearch = require("elasticsearch");

module.exports = class ElasticSearchLoggerProvider {

    constructor() {
        this.connect();
    }

    connect() {
        this.client = new elasticsearch.Client({
            hosts: [configuration.log.provider.host]
        });

        this.client.ping({
            requestTimeout: 30000,
        }, function (error) {
            if (error) {
                console.error('elasticsearch cluster is down!');
            } else {
                console.log('Everything is ok');
            }
        });
        this.createIndex('logs');
    }
    createIndex(name) {
        this.client.indices.create({
            index: name
        }, function (err, resp, status) {
            if (err) {
                console.log(err);
            } else {
                console.log("create", resp);
            }
        });
    }

    save(message, type){

        this.client.index({
            index: 'logs',
            type: type,
            body: {
                date: new Date(),
                message: JSON.stringify(message)
            }
        }, (err, resp, status) => {
            if(err){
                console.err(err);
            }
        });
    }
}