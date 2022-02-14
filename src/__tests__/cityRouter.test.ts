import request from 'supertest'
import app from '../../build/app.js'

const CityPayload = {
    city_id: 1,
    city_name: "Днепр"
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
