const server = require('../src/app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const fs = require("fs");
const configuration = require('../src/config');

describe("File endpoint", () => {

    beforeAll(() =>{
        fs.writeFileSync(__dirname+'/test.tgz', 'asdasd');
    });

    test('GET /file should return 200', async () => {
        const resp = await requestWithSupertest.get("/file")
            .set("authorization", configuration.authentication.token);
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual(expect.stringContaining('json'));
    });

    test('POST /file should return 200', async () => {
        const resp = await requestWithSupertest.post("/file")
            .set("Authorization", configuration.authentication.token)
            .attach('file',__dirname+"/test.tgz");
        expect(resp.status).toEqual(200);
        expect(resp.body.code).toEqual(200);
        expect(resp.body.message).toEqual(expect.stringContaining('File Uploaded'));

    });

    test('GET /file/download/:id should return 200', async () => {
        const resp = await requestWithSupertest.get("/file")
            .set("Authorization", configuration.authentication.token);
        const file = resp.body[0];

        const respDownload = await requestWithSupertest.get("/file/download/"+file._id.toString())
            .set("Authorization", configuration.authentication.token)
            .buffer();
        expect(respDownload.status).toEqual(200);
        expect(respDownload.headers["content-disposition"]).toEqual("attachment; filename=\""+file.name+"\"");
    });

    test('GET /file/download/:id should return 404 for inexistent file', async () => {

        fs.writeFileSync(__dirname+'/test.tgz', 'asdasd');

        const respUpload = await requestWithSupertest.post("/file")
            .set("Authorization", configuration.authentication.token)
            .attach('file',__dirname+"/test.tgz");

        expect(respUpload.status).toEqual(200);

        const resp = await requestWithSupertest.get("/file")
            .set("Authorization", configuration.authentication.token);
        const file = resp.body[resp.body.length - 1];

        const id = file._id.toString();

        fs.unlinkSync(file.path+"/test.tgz");

        const respDownload = await requestWithSupertest.get("/file/download/"+id)
            .set("Authorization", configuration.authentication.token)
            .buffer();
        expect(respDownload.status).toEqual(404);
        expect(respDownload.text).toEqual(expect.stringContaining('File not found on repository.'));
    });

    test('GET /file/download/:id should return 404 data not found', async () => {

        const id = "4321";

        const respDownload = await requestWithSupertest.get("/file/download/"+id)
            .set("Authorization", configuration.authentication.token)
            .buffer();
        expect(respDownload.status).toEqual(404);
        expect(respDownload.text).toEqual(expect.stringContaining("Element `" + id + "` not found"));
    });

    afterAll((done) => {
        server.close(done);
    })


});