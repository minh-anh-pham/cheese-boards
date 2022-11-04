const {User, Cheese, Board} = require("../models");
const db = require("./db");

async function seed () {
    // delete & make all new tables
    await db.sync({force: true});
}

seed()
