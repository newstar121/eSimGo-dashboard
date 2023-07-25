module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plan", {
        country: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.INTEGER
        },
        duration: {
            type: Sequelize.INTEGER
        },
        speed: {
            type: Sequelize.STRING
        },
        roaming: {
            // type: Sequelize.ARRAY(Sequelize.STRING),
            type: Sequelize.TEXT
            // type: Sequelize.STRING
            // defaultValue: []
        },
        price: {
            type: Sequelize.FLOAT
        }
    });

    return Plan;
};