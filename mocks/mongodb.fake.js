const path = require("path");
const file = {
    _id: "1234",
    name: 'test.tgz',
    path: path.resolve(__dirname,"../__tests__/")
};
const results = {
    then: (cb) => {
        cb({
            toArray: function (callback) {
                console.log("Calling callback")
                console.log(callback);
                callback(null, [file]);
            }
        })
    }
}

module.exports = class MongoDBProviderFake {

    constructor(collection) {
    }

    save(obj) {
        return new Promise((resolve, reject)=>{
            obj._id = "1234";
            resolve(obj);
        });
    }
    saveMany (obj){
        return new Promise((resolve, reject)=>{
            obj._id = "1234";
            resolve(obj);
        });
    }
    find (id){
        return new Promise((resolve, reject) => {
            if (id === file._id){
                resolve(file);
            } else {
                reject({ code: 404, message: "Element `" + id + "` not found" });
            }
            
        });
    }
    findAll (offset, limit, sort) {
        return new Promise((resolve, reject) => {
            resolve(results);
        })
    }

    deleteAll(obj){
        return new Promise((resolve, reject) => {
            resolve();
        })
    }
};