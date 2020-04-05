const supertest = require("supertest");

const host = "http://localhost:4200";
const request = supertest(host);

const Mockedusers = [
    {
        id:1,
        name: "Franciele",
        email: "franciele.camposf@gmail.com",
        department: "QA"
    },
    {
        id:2,
        name: "Anderson",
        email: "anderson@gmail.com",
        department: "TI"
    }
];

describe("Users API Test Suite", ()=> {


    jest.setTimeout(10000);

    it("Should get all users", async () => {
        const response = await request.get("/users");
       // console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
      //  expect(response.body).toEqual(Mockedusers);
    });

    it("Should get user by id", async () => {
        const response = await request.get("/users/2");
        expect(response.statusCode).toBe(200);
        expect(response.body[0].name).toContain("Anderson");
       // expect(response.body[0].department).toEqual("TI");
        console.log(response.body);
    });

    it("Should create user", async () => {
        const users = await request.get("/users");
        const countBeforeRunTest = users.body.length;

        const response = await request.post("/users").send(
            {
                name: "Maria da silva",
                email: "maria.s@gmail.com",
                department: "Telemarketing"
            }
        );
        expect(response.statusCode).toBe(201);
        expect(response.body.length).toEqual(countBeforeRunTest+1);
    });

    it("Should update a single user by id", async () => {
        const response = await request.put("/users/1").send({
            department: "design"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.user.department).toEqual("design");
        console.log(response.body);
    });

    it("Should delete a single user by id", async () => {
        const response = await request.delete("/users/2");
        expect(response.statusCode).toBe(200);
        
        response.body.users.forEach(user => {
            if(user.name == "Anderson"){
                throw new Error("user was not deleted successfully")
            }
        });
    });

    it("Should return 404 getting user with invalid id", async () => {
        const response = await request.get("/users/x");
        expect(response.statusCode).toBe(404);
    });

    it("Should return 404 updating user with invalid id", async () => {
        const response = await request.put("/users/x").send({
            department: "design"
        })
        expect(response.statusCode).toBe(404);
    });

    it("Should return 400 creting user with invalid body", async () => {
        const response = await request.post("/users").send({
            abdc: "XTEST"
        })
        expect(response.statusCode).toBe(400);
    });

    it("Should return 404 deleting user with invalid id", async () => {
        const response = await request.delete("/users/x");
        expect(response.statusCode).toBe(404);
    });
});
