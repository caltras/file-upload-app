const server = require('../src/app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const fs = require("fs");
const configuration = require("../src/config")

describe("File endpoint", () =>{

    test('GET /file should return 200', async () => {
        const resp = await requestWithSupertest.get("/file");
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual(expect.stringContaining('json'));
    });

    test('POST /file should return 200', async () => {

        const resp = await requestWithSupertest.post("/file")
            .attach('file',__dirname+"/test.tgz");
        expect(resp.status).toEqual(200);
        expect(resp.body.code).toEqual(200);
        expect(resp.body.message).toEqual(expect.stringContaining('File Uploaded'));
        
    });

    test('GET /file/download/:id should return 200', async () => {

        const resp = await requestWithSupertest.get("/file");
        const file = resp.body[0];

        const respDownload = await requestWithSupertest.get("/file/download/"+file._id.toString())
            .buffer();
        expect(respDownload.status).toEqual(200);
        expect(respDownload.headers["content-disposition"]).toEqual("attachment; filename=\""+file.name+"\"");
    });

    // test('GET /file/download/:id should return 404 for inexistent file', async () => {

    //     fs.writeFileSync(__dirname+'/test2.tgz', 'asdasd');

    //     const respUpload = await requestWithSupertest.post("/file")
    //         .attach('file',__dirname+"/test2.tgz");

    //     expect(respUpload.status).toEqual(200);

    //     const resp = await requestWithSupertest.get("/file");
    //     const file = resp.body[resp.body.length - 1];

    //     const id = file._id.toString();

    //     console.log(file.path+"/test2.tgz")

    //     fs.unlinkSync(file.path+"/test2.tgz");

    //     const respDownload = await requestWithSupertest.get("/file/download/"+id)
    //         .buffer();
    //     expect(respDownload.status).toEqual(404);
    //     expect(respDownload.body.message).toEqual(expect.stringContaining('File not found on repository.'));
    // });

    afterAll((done) => {
        done();
    })

    
});