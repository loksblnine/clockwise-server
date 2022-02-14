import request from 'supertest'
import app from '../../build/app.js'
import {randomInt} from "crypto";

const OrderPayload = {
    "master_id": "27",
    "customer_name": "Zinchenko Tatyana Nikolaevna",
    "customer_email": "illya200457@gmail.com",
    "city_id": "1",
    "order_time": "2022-03-20T08:00",
    "work_id": randomInt(1, 3),
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

describe("/orders", () => {

    describe("POST", () => {

        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .post("/orders")
                .set({"Content-Type": "application/json"})
                .send(OrderPayload)
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))

            const responseDelete = await request(app)
                .delete(`/orders/${response.body.order_id}`)
                .set({"Authorization": `Bearer ${token}`})
            expect(responseDelete.statusCode).toBe(201)
            expect(responseDelete.body).toBe(`Order ${response.body.order_id} was removed successfully`)
        })

        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/orders")
                .set({"Content-Type": "application/json"})
            expect(response.statusCode).toBe(500)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBe(errorMessage)
        })

        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/orders")
                .set({"Content-Type": "application/json"})
                .send({
                    "customer_name": "Zinchenko Tatyana Nikolaevna",
                    "customer_email": "illya200457@gmail.com",
                    "city_id": "1",
                    "order_time": "2022-01-20T08:00",
                    "work_id": "2",
                })
            expect(response.statusCode).toBe(500)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBe(errorMessage)
        })

        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/orders")
                .set({"Content-Type": "application/json"})
                .send({
                    "master_id": 1,
                    "customer_email": "unvalid@gmailcom",
                    "city_id": "1",
                    "order_time": "2022-01-20T08:00",
                    "work_id": "2",
                })
            expect(response.statusCode).toBe(500)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBe(errorMessage)
        })

        test("should respond with a 500", async () => {
            const response = await request(app)
                .post("/orders")
                .set({"Content-Type": "application/json"})
                .send({
                    "master_id": 1,
                    "customer_name": "Abc 123 Abstract",
                    "city_id": "1",
                    "order_time": "2022-01-20T08:00",
                    "work_id": "2",
                })
            expect(response.statusCode).toBe(500)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBe(errorMessage)
        })

    })
})
