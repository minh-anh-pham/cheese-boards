const {Board} = require("../models");
const db = require("../db/db");

let testBoard = [];

// new board
beforeEach(async () => {
    await db.sync({force: true});

    await Board.create({
        type: "testType",
        description: "testDescription",
        rating: 1.5
    });

    testBoard = await Board.findAll();

    return testBoard;
})

describe("new board", () => {

    test("new board belongs to board model", async () => {
        expect(testBoard[0]).toBeInstanceOf(Board);
    })

    test("creates 1 row", async () => {
        expect(testBoard.length).toEqual(1);
    })

    test("has correct id", () => {
        expect(testBoard[0].id).toEqual(1);
    })

    test("has correct type", () => {
        expect(testBoard[0].type).toEqual("testType");
    })

    test("has correct description", () => {
        expect(testBoard[0].description).toEqual("testDescription");
    })

    test("has correct rating", () => {
        expect(testBoard[0].rating).toEqual(1.5);
    })
})

describe("update existing board", () => {
    test("can update", async () => {
        testBoard[0].update({
            type: "testType1"
        })

        testBoard = await Board.findAll();

        expect(testBoard[0].type).toEqual("testType1");
    })
})

describe("remove existing board", () => {

    test("can remove", async () => {
        await testBoard[0].destroy();

        testBoard = await Board.findAll();

        expect(testBoard.length).toEqual(0);
    })
})
