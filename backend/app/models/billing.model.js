const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userId: {
            type: Sequelize.INTEGER
        },
        country: {
            type: Sequelize.STRING
        },
        countryCode: {
            type: Sequelize.STRING
        },
        vatNo: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address1: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        }
    });

    return User;
};