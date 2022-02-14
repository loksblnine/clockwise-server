import request from 'supertest'
import app from '../../build/app.js'
import {randomInt} from "crypto";

const OrderPayload = {
    work_id: 1,
    city_id: 1,
    order_time: "2022-02-02"
}

const MasterPayload = {
    master_name: "Master From the City",
    email: `test${randomInt(50)}@example.com`,
    ranking: 5,
    isApproved: true
}


let token: String = ''
const errorMessage = "Something went wrong"

const adminLogIn = {
    email: "admin@example.com",
    password: "passwordsecret"
}

beforeAll(async () => {
    const response = await request(app).post('/auth/login').send(adminLogIn);
    token = response.body.token;
})

describe("/masters", () => {

    describe("GET /free", () => {
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .post("/masters/free")
                .set({"Content-Type": "application/json"})
                .send(OrderPayload)
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/masters/free")
                .set({"Content-Type": "application/json"})
            expect(response.statusCode).toBe(500)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBe(errorMessage)
        })
        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/masters/free")
                .set({"Content-Type": "application/json"})
                .send({
                    "123": 123,
                    "city_id": "1",
                    "work_id": "1"
                })
            expect(response.statusCode).toBe(500)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBe(errorMessage)
        })
    })
    describe("GET /", () => {
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .get("/masters/offset/0")
                .set({
                    "Authorization": `Bearer ${token}`
                })
            expect(response.body.length).toBeGreaterThan(0)
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("should respond with a 201", async () => {
            const response = await request(app)
                .get("/offset/100")
                .set({
                    "Authorization": `Bearer ${token}`
                })
            expect(response.body).toEqual({})
            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("text"))
        })
        test("should respond with an empty object", async () => {
            const response = await request(app)
                .get("/offset/")
                .set({
                    "Authorization": `Bearer ${token}`
                })
            expect(response.body).toEqual({})
            expect(response.statusCode).toBe(404)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("text"))
        })
    })
    describe("POST+PUT+DELETE /:id", () => {

        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .post("/masters")
                .set({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
                .send(MasterPayload)
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))

            const responsePut = await request(app)
                .put(`/masters/${response.body.master_id}`)
                .set({
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                })
                .send({
                    "master_name": "Master",
                    "email": "test123@example.com",
                    "ranking": "3",
                    "isApproved": "true"
                })
            console.log(responsePut.body)
            expect(responsePut.body.length).toBeGreaterThan(2)
            expect(responsePut.statusCode).toBe(201)
            expect(responsePut.headers['content-type']).toEqual(expect.stringContaining("json"))

            const responseDelete = await request(app)
                .delete(`/masters/${response.body.master_id}`)
                .set({"Authorization": `Bearer ${token}`})
            expect(responseDelete.statusCode).toBe(201)
            expect(responseDelete.body).toBe(`Master ${response.body.master_id} was removed successfully`)
        })

        test("should respond with a 401", async () => {
            const response = await request(app)
                .post("/masters")
                .set({"Content-Type": "application/json"})
            expect(response.statusCode).toBe(401)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/masters")
                .set({
                    "Authorization": `Bearer ${token}`
                })
                .set({
                    "Content-Type": "application/json"
                })
                .send({
                    master_name: "ABCdata"
                })

            expect(response.statusCode).toBe(500)
            expect(response.body).toBe(errorMessage)
        })

        test("should respond with a 201", async () => {
            const response = await request(app)
                .post("/masters")
                .set({
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                })
                .send({
                    master_name: "Master From City ABC",
                    email: "valid@example.com",
                    ranking: 15,
                    isApproved: true
                })
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body.master_id).toBeGreaterThan(0)

            const responseDelete = await request(app)
                .delete(`/masters/${response.body.master_id}`)
                .set({"Authorization": `Bearer ${token}`})
            expect(responseDelete.statusCode).toBe(201)
            expect(responseDelete.body).toBe(`Master ${response.body.master_id} was removed successfully`)
        })
        test("should respond with a 401", async () => {
            const response = await request(app)
                .post("/masters")
                .set({"Content-Type": "application/json"})
                .send({
                    master_name: "Master From City ABC",
                    email: "valid@example.com",
                    ranking: 15,
                    isApproved: true
                })
            expect(response.statusCode).toBe(401)
        })
    })
})
