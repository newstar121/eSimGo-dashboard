const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("history", {
        userId: {
            type: Sequelize.INTEGER
        },
        value: {
            type: Sequelize.FLOAT
        }
    });

    return History;
};