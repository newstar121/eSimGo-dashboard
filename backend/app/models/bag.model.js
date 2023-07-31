const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const Bag = sequelize.define("bag", {
        userId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Bag;
};