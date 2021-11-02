const server = require('../src/app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const fs = require("fs");

const mockSuccessDB = () => {
    jest.mock('../src/services/db/mongodb.service.js', () =>{
        return () => {
            const file = {
                _id: "1234",
                name: 'test.tgz',
                path: '/tmp'
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
            this.save = function(obj) {
                return Promise.resolve();
            }
            this.saveMany= function (obj) {
                return Promise.resolve();
            }
            this.find = function(id) {
                return Promise.resolve({
                    _id: "1234",
                    name: 'test.tgz',
                    path: '/tmp'
                });
            }
            this.findAll = function(offset, limit, sort) {
                return results;
            }
            return this;
        }
    });
}


describe("File endpoint", () => {

    beforeAll(() =>{
        fs.writeFileSync(__dirname+'/test.tgz', 'asdasd');
    });

    test('GET /file should return 200', async () => {
        //mockSuccessDB();
        const resp = await requestWithSupertest.get("/file");
        console.log(resp.text);
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual(expect.stringContaining('json'));
    });

    test('POST /file should return 200', async () => {
        //mockSuccessDB();
        const resp = await requestWithSupertest.post("/file")
            .attach('file',__dirname+"/test.tgz");
        expect(resp.status).toEqual(200);
        expect(resp.body.code).toEqual(200);
        expect(resp.body.message).toEqual(expect.stringContaining('File Uploaded'));

    });

    test('GET /file/download/:id should return 200', async () => {
        //mockSuccessDB();
        const resp = await requestWithSupertest.get("/file");
        const file = resp.body[0];

        const respDownload = await requestWithSupertest.get("/file/download/"+file._id.toString())
            .buffer();
        expect(respDownload.status).toEqual(200);
        expect(respDownload.headers["content-disposition"]).toEqual("attachment; filename=\""+file.name+"\"");
    });

    test('GET /file/download/:id should return 404 for inexistent file', async () => {

        fs.writeFileSync(__dirname+'/test.tgz', 'asdasd');

        const respUpload = await requestWithSupertest.post("/file")
            .attach('file',__dirname+"/test.tgz");

        expect(respUpload.status).toEqual(200);

        const resp = await requestWithSupertest.get("/file");
        const file = resp.body[resp.body.length - 1];

        const id = file._id.toString();

        console.log(file.path+"/test.tgz")

        fs.unlinkSync(file.path+"/test.tgz");

        const respDownload = await requestWithSupertest.get("/file/download/"+id)
            .buffer();
        expect(respDownload.status).toEqual(404);
        expect(respDownload.text).toEqual(expect.stringContaining('File not found on repository.'));
    });

    test('GET /file/download/:id should return 404 data not found', async () => {

        const id = "4321";

        const respDownload = await requestWithSupertest.get("/file/download/"+id)
            .buffer();
        expect(respDownload.status).toEqual(404);
        expect(respDownload.text).toEqual(expect.stringContaining("Element `" + id + "` not found"));
    });

    afterAll((done) => {
        server.close(done);
    })


});