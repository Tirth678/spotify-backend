const request = require('supertest');
const app = require('../app')

describe("GET /", () => {
    it("should return status 200 OK", async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Hello, world!"})
    })
})
// test it using npx jest