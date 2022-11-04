const User = require("./user.model");
const Cheese = require("./cheese.model");
const Board = require("./board.model");

// associations
User.hasMany(Board);
Board.belongsTo(User);

Board.belongsToMany(Cheese, {through: "Board_Cheese"});
Cheese.belongsToMany(Board, {through: "Board_Cheese"});

module.exports = {
    User,
    Cheese,
    Board
};
