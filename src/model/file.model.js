const { replaceSpecialCharacters } = require('../utility/string.util');
module.exports = class FileModel {
    constructor(file) {
        this.name = replaceSpecialCharacters(file.originalname);
        this.path = file.destination;
        this.size = file.size;
        this.createAt = new Date();
    }
}