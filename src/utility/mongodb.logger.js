const configuration = require("../config");
const { MongoClient, ObjectId } = require('mongodb');

module.exports = class MongoDBLoggerProvider {

    constructor(){
        this.client = new MongoClient(configuration.log.provider.host);
        this.dbName = "logs-db";
        this.collectionName = "logs";
    }

    async getCollection() {
        try {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            return this.db.collection(this.collectionName);
        } catch (e) {
            console.error(JSON.stringify(e));
            return Promise.reject({error: 500, message: e.message});
        }
    }

    async save(message, type){
        try {
            let collection = await this.getCollection();
            return collection.insertOne({
                date: new Date(),
                message: JSON.stringify(message),
                type: type
            });
        } catch (e) {
            console.error(e);
        }
    }
}