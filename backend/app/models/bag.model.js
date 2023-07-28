const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return User;
};