const { API_URL, API_KEY, USER_ROLE } = require("../../utils/constants");
const db = require("../models");
const Plan = db.plans;
const Op = db.Sequelize.Op;
const axios = require('axios')
const jwt_decode = require('jwt-decode');

// Create and Save a new Plan
exports.create = (req, res) => {

    const plan = {
        country: req.body.plan.country,
        data: req.body.plan.data,
        duration: req.body.plan.duration,
        roaming: req.body.plan.roaming,
        price: req.body.plan.price,
    };

    // Save Tutorial in the database
    Plan.create(plan)
        .then(data => {
            res.send({
                success: true,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "Some error occurred while creating a User."
            });
        });
};

// Retrieve all Plans from the database.

exports.findAll = (req, res) => {

    const country = req.query.country;

    const condition = country ? {
        country: { [Op.like]: `%${country}%` }
    } : null

    Plan.findAll({
        where: condition
    }).then(async (data) => {

        let plans = []

        try {

            let response = await axios.get(API_URL + 'organisation/groups',
                {
                    headers: {
                        'X-API-Key': API_KEY,
                    }
                }
            )

            let group = response.data.groups[0];
            let groupName = group?.name || ''

            response = await axios.get(API_URL + 'catalogue',
                {
                    params: {
                        group: groupName,
                        limit: 1000
                    },
                    headers: {
                        'X-API-Key': API_KEY,
                    }
                }
            )

            let bundles = response.data.bundles;

            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            const decoded = jwt_decode(token);
            const role = decoded.role || USER_ROLE.user;

            for (let i = 0; i < bundles.length; i++) {

                let countryName = bundles[i].countries[0].name || ''
                let duration = bundles[i].duration
                let dataAmount = (bundles[i].dataAmount / 1000)
                let findIndex = data.findIndex((item) => item.country.includes(countryName) && item.duration == duration && item.data == dataAmount)

                if (role == USER_ROLE.user) {
                    if (findIndex > -1) {
                        bundles[i].company_price = data[findIndex].price || 0
                        bundles[i].country = countryName
                        bundles[i].data = bundles[i].dataAmount
                    } else {
                        bundles[i].company_price = bundles[i].price + 30 || 0
                        bundles[i].country = countryName
                        bundles[i].data = bundles[i].dataAmount
                        console.log('bundles:', countryName)
                    }
                } else {
                    bundles[i].company_price = bundles[i].price
                    bundles[i].country = countryName
                    bundles[i].data = bundles[i].dataAmount
                }

            }

            plans = [].concat(bundles);
        } catch (error) {
            console.log('eSIMeSi API call error', error)
            return res.status(500).send({
                success: false,
                message: 'eSIM API call error'
            });
        }

        res.send({
            success: true,
            plans: plans
        })

    }).catch(err => {
        res.status(500).send({
            success: false,
            message:
                err.message || "Some error occurred while retrieving plans."
        });
    })
};

// Find a single Plan with an id
exports.findOne = (req, res) => {

};

// Update a Plan by the id in the request
exports.update = (req, res) => {

};

// Delete a Plan with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Plans from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Plans
exports.findAllPublished = (req, res) => {

};