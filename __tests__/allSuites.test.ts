import request from 'supertest'
import app from '../build/app.js'

const CityPayload = {
    city_id: 1,
    city_name: "Днепр"
}

const getFreeMasterBody = {
    work_id: 1,
    city_id: 1,
    order_time: "2022-02-02T14:00"
}

const MasterPayload = {
    master_name: "Master From the City",
    email: `test222@example.com`,
    ranking: 5,
    isApproved: false
}

const OrderPayload = {
    master_id: 27,
    customer_name: "Zinchenko Tatyana Nikolaevna",
    customer_email: "illya200457@gmail.com",
    city_id: 1,
    order_time: "2022-03-20T11:00",
    work_id: 1,
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

describe("/cities", () => {

    describe("GET", () => {
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .get("/cities")
                .set({
                    "Authorization": `Bearer ${token}`
                })
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toContainEqual(CityPayload)
            expect(response.body.length).toBe(1)
        })
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app).get("/cities")
            expect(response.statusCode).toBe(201)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toContainEqual(CityPayload)
        })
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .get("/cities/1")
                .set({"Authorization": `Bearer ${token}`})
            expect(response.statusCode).toBe(201)
            expect(response.body).toEqual(CityPayload)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
            expect(response.body).toBeInstanceOf(Object)
        })
        test("should respond with a 500 (Internal Server Error)", async () => {
            const response = await request(app)
                .get("/cities/abc")
                .set({"Authorization": `Bearer ${token}`})
            expect(response.statusCode).toBe(500)
            expect(response.body).toBe(errorMessage)
        })
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .get("/cities/500")
                .set({"Authorization": `Bearer ${token}`})
            expect(response.statusCode).toBe(201)
            expect(response.body).toBeNull()
        })
    })
})
describe("/masters", () => {

    describe("GET /free", () => {
        test("should respond with a 201 (Created)", async () => {
            const response = await request(app)
                .post("/masters/free")
                .set({"Content-Type": "application/json"})
                .send(getFreeMasterBody)
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
                    master_name: "Master Iluhan",
                    email: "test1@example.com",
                    ranking: 5,
                    isApproved: true
                })
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
