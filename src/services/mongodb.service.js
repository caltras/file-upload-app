const configuration = require("../config");
const { MongoClient, ObjectId } = require('mongodb');
const logger = require("../utility/logger")("MongoDBProvider");

const url = configuration.db.url;;

module.exports = class MongoDBProvider {

    constructor(collection) {
        this.client = new MongoClient(url);
        this.dbName = "files-db";
        this.collectionName = collection;
    }

    async getCollection() {
        try {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            return this.db.collection(this.collectionName);
        } catch (e) {
            logger.error(JSON.stringify(e));
            return null;
        }
    }

    async save(obj) {
        try {
            let collection = await this.getCollection();
            return collection.insertOne(obj);
        } catch (e) {
            logger.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    async saveMany(listObj) {
        try {
            let collection = await this.getCollection();
            return collection.insertMany(listObj);
        } catch (e) {
            logger.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }

    async find(id) {
        try {
            let _id = new ObjectId(id);

            let collection = await this.getCollection();

            return collection.findOne({ _id: _id })
                .then((result => {
                    if (!result) {
                        throw { code: 404, message: "Element `" + id + "` not found" };
                    }
                    return result;
                }));
        } catch (e) {
            logger.error(JSON.stringify(e));
            return Promise.reject(e);
        }

    }

    async findAll(offset, limit, sort) {
        try {
            let mapSort;
            if (sort) {
                mapSort = {};
                sort.split(",").forEach((s) => {
                    let descAsc = s[0].indexOf("-") > -1 ? -1 : 1;
                    let field = s.replace("-", "");
                    mapSort[field] = descAsc
                });
            }
            let collection = await this.getCollection();

            return collection.find({})
                .skip(Number(offset || 0))
                .sort(mapSort || {})
                .limit(Number(limit || 10));
        } catch (e) {
            logger.error(JSON.stringify(e));
            return Promise.reject(e);
        }
    }
};