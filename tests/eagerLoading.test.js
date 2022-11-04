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

    return Board, Cheese;
})

describe("many-to-many relationship", () => {

    test("verify board can be loaded with its cheeses", async () => {
        const allCheeses = await Board.findAll({
            include: Cheese
        })

        expect(allCheeses[0].Cheeses[0].title).toEqual("title2");
        expect(allCheeses[0].Cheeses[1].title).toEqual("title3");
        expect(allCheeses[2].Cheeses[0].title).toEqual("title3");
    })

})
