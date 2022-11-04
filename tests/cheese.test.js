const {Cheese} = require("../models");
const db = require("../db/db");

let testCheese = [];

// new board
beforeEach(async () => {
    await db.sync({force: true});

    await Cheese.create({
        title: "testTitle",
        description: "testDescription"
    });

    testCheese = await Cheese.findAll();

    return testCheese;
})

describe("new cheese", () => {

    test("new cheese belongs to cheese model", async () => {
        expect(testCheese[0]).toBeInstanceOf(Cheese);
    })

    test("creates 1 row", async () => {
        expect(testCheese.length).toEqual(1);
    })

    test("has correct id", () => {
        expect(testCheese[0].id).toEqual(1);
    })

    test("has correct title", () => {
        expect(testCheese[0].title).toEqual("testTitle");
    })

    test("has correct description", () => {
        expect(testCheese[0].description).toEqual("testDescription");
    })
})

describe("update existing cheese", () => {
    test("can update", async () => {
        testCheese[0].update({
            title: "testTitle1"
        })

        testCheese = await Cheese.findAll();

        expect(testCheese[0].title).toEqual("testTitle1");
    })
})

describe("remove existing board", () => {

    test("can remove", async () => {
        await testCheese[0].destroy();

        testCheese = await Cheese.findAll();

        expect(testCheese.length).toEqual(0);
    })
})
