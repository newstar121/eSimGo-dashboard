const db = require("../models");
const Billing = db.billing;
const jwt_decode = require('jwt-decode')

// Find billing info

exports.findOne = (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt_decode(token);
        const userId = decoded.id;

        const condition = country ? {
            userId: userId
        } : null

        Billing.findOne({
            where: condition
        }).then(billing => {

            if (billing) {
                res.send({
                    success: true,
                    billing: billing
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: `Cannot find billing info with userId=${userId}.`
                });
            }
        })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: "Error finding billing info with userId=" + userId
                });
            });
    } catch (error) {
        console.log('get Billing info error', error)
    }
};