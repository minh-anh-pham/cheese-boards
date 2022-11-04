const {User} = require("../models");
const db = require("../db/db");

let testUser = [];

// new user
beforeEach(async () => {
    await db.sync({force: true});

    await User.create({
        name: "test",
        email: "test@gmail.com"
    });

    testUser = await User.findAll();

    return testUser;
})

describe("new user", () => {

    test("new user belongs to user model", async () => {
        expect(testUser[0]).toBeInstanceOf(User);
    })

    test("creates 1 row", async () => {
        expect(testUser.length).toEqual(1);
    })

    test("has correct id", () => {
        expect(testUser[0].id).toEqual(1);
    })

    test("has correct name", () => {
        expect(testUser[0].name).toEqual("test");
    })

    test("has correct email", () => {
        expect(testUser[0].email).toEqual("test@gmail.com");
    })
})

describe("update existing user", () => {
    test("can update", async () => {
        testUser[0].update({
            name: "test1"
        })

        testUser = await User.findAll();

        expect(testUser[0].name).toEqual("test1");
    })
})

describe("remove existing user", () => {

    test("can remove", async () => {
        await testUser[0].destroy();

        testUser = await User.findAll();

        expect(testUser.length).toEqual(0);
    })
})
