const {Board, User} = require("../models");
const db = require("../db/db");

let testUser = [];
let testBoard = [];

beforeEach(async () => {
    await db.sync({force: true});

    await Board.create({
        type: "testType",
        description: "testDescription",
        rating: 1.5
    });

    await User.create({
        id: 2,
        name: "test",
        email: "test@gmail.com"
    });

    testBoard = await Board.findOne();
    testUser = await User.findOne();

    await testBoard.setUser(testUser);

    return testUser, testBoard;
})

describe("one-to-many relationship", () => {
    test("correct UserId", async () => {
        expect(testBoard.UserId).toEqual(2);
    })

    test("correct number of boards", async () => {
        let anotherOne = await Board.create({
            type: "testType1",
            description: "testDescription1",
            rating: 2.0
        })

        await anotherOne.setUser(testUser);

        const count = await testUser.countBoards();

        expect(count).toEqual(2);
    })

})
