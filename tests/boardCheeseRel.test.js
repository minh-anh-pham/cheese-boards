const {Board, Cheese} = require("../models");
const db = require("../db/db");

let testCheeses = [];
let testBoards = [];

beforeEach(async () => {
    await db.sync({force: true});

    testBoards = await Board.bulkCreate([
        {type: "type1"},
        {type: "type2"},
        {type: "type3"},
        {type: "type4"}
    ]);

    testCheeses = await Cheese.bulkCreate([
        {title: "title1"},
        {title: "title2"},
        {title: "title3"},
        {title: "title4"}
    ]);

    testBoards = await Board.findAll();
    testCheeses = await Cheese.findAll();

    await testBoards[0].addCheeses(testCheeses[1]);
    await testBoards[0].addCheeses(testCheeses[2]);
    await testBoards[2].addCheeses(testCheeses[2]);

    return testCheeses, testBoards;
})

describe("many-to-many relationship", () => {
    test("junction table exists", async () => {
        expect(db.models.Board_Cheese).toBeTruthy();
    })

    test("junction table has correct relationships", async () => {
        const board1 = await Board.findOne({where: {type: "type1"}});
        const board1Cheeses = await board1.getCheeses();

        const board3 = await Board.findOne({where: {type: "type3"}});
        const board3Cheeses = await board3.getCheeses();

        console.log(board3Cheeses);
        expect(board1Cheeses[0].title).toEqual("title2");
        expect(board1Cheeses[1].title).toContain("title3");
        expect(board3Cheeses[0].title).toEqual("title3");
    })

})
