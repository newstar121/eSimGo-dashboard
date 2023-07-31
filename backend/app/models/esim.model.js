const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const ESim = sequelize.define("esim", {
        userId: {
            type: Sequelize.INTEGER
        },
        iccid: {
            type: Sequelize.STRING
        },
        reference: {
            type: Sequelize.STRING
        },
        lastAction: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        country: {
            type: Sequelize.STRING
        },
        left: {
            type: Sequelize.FLOAT
        },
        total: {
            type: Sequelize.FLOAT
        },
        expiry: {
            type: Sequelize.DATE
        }
    });

    return ESim;
};