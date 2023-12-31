const Constants = require("../../utils/constants");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM(Constants.USER_ROLE.company, Constants.USER_ROLE.reseller, Constants.USER_ROLE.user),
            defaultValue: Constants.USER_ROLE.user
        }
    });

    return User;
};