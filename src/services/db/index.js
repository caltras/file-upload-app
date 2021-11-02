const service = process.env.ENV === "tst"? "../../../mocks/mongodb.fake.js": "./mongodb.service.js";

module.exports = require(service);