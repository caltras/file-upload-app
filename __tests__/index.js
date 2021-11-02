const server = require('../src/app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe("Test Welcome page", () =>{

    test('GET / should return the welcome page', async () => {
        const resp = await requestWithSupertest.get("/");
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual(expect.stringContaining('html'));
        expect(resp.text).toEqual(expect.stringContaining('Welcome to the File Upload Service'));
    });

    test('GET /not-found should return Page not Found', async () => {
        const resp = await requestWithSupertest.get("/not-found");
        expect(resp.status).toEqual(404);
        expect(resp.type).toEqual(expect.stringContaining('html'));
        expect(resp.text).toEqual(expect.stringContaining('Page not Found'));
    });

    afterAll((done) => {
        done();
    })

    
});