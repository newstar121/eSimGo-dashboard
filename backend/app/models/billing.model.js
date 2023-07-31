const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const Billing = sequelize.define("billing", {
        userId: {
            type: Sequelize.INTEGER
        },
        taxNumber: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.STRING
        },
        billingFirstNames: {
            type: Sequelize.STRING
        },
        billingSurname: {
            type: Sequelize.STRING
        },
        billingAddr1: {
            type: Sequelize.STRING
        },
        billingAddr2: {
            type: Sequelize.STRING
        },
        billingCity: {
            type: Sequelize.STRING
        },
        billingPostcode: {
            type: Sequelize.STRING
        },
        billingState: {
            type: Sequelize.STRING
        },
        registeredCountry: {
            type: Sequelize.STRING
        }
    });

    return Billing;
};