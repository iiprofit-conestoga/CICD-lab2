const request = require('supertest');
const app = require('../server');

describe("API Tests", () => {
    
    it("GET /hello - should return a JSON response", async () => {
        const res = await request(app).get('/hello');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Hello, Jenkins!");
    });

    it("GET /status - should return status OK", async () => {
        const res = await request(app).get('/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("status", "OK");
    });

    it("POST /sum - should return the sum of two numbers", async () => {
        const res = await request(app)
            .post('/sum')
            .send({ num1: 5, num2: 10 });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("sum", 15);
    });

    it("POST /sum - should return an error for invalid input", async () => {
        const res = await request(app)
            .post('/sum')
            .send({ a: "five", b: 10 });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("error", "Invalid input");
    });

});