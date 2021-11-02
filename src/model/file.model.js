module.exports = class FileModel {
    constructor(file) {
        this.name = file.originalname;
        this.path = file.destination;
        this.size = file.size;
        this.createAt = new Date();
    }
}