const db = require("../models");
const User = db.user;
const Billing = db.billing;
const jwt_decode = require('jwt-decode');
const Constants = require("../../utils/constants");
const axios = require("axios");
require('dotenv').config()

exports.getOrganisation = (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt_decode(token);
        const userId = decoded.id;
        const role = decoded.role || Constants.USER_ROLE.user;

        User.findByPk(userId)
            .then(async user => {

                if (user) {

                    if (role == Constants.USER_ROLE.company) {
                        // Get API token from eSIMGO
                        // const base64EncodedString = Buffer.from(process.env.COMPANY_USERNAME + ':' + process.env.COMPANY_PASSWORD, 'utf-8').toString('base64');
                        const base64EncodedString = Buffer.from(user.username + ':' + user.password, 'utf-8').toString('base64');

                        axios.get(Constants.API_URL + 'login',
                            {
                                headers: {
                                    'Authorization': 'Basic ' + base64EncodedString,
                                }
                            }
                        ).then((response) => {
                            axios.get(Constants.API_URL + 'organisations/current',
                                {
                                    params: {
                                        id: 'current'
                                    },
                                    headers: {
                                        Authorization: 'Bearer ' + response.data.token || response.data.refreshToken
                                    }
                                }
                            ).then((result) => {
                                res.send({
                                    success: true,
                                    organisations: result.data.organisations || [],
                                    user: result.data.user || {}
                                });
                            }).catch(err => {
                                res.status(500).send({
                                    success: false,
                                    message: "erroring get organisations data from esimgo"
                                });
                            });

                        }).catch(error => {
                            res.status(201).send({
                                success: false,
                                message: 'Login eSIMGO failed'
                            });
                            console.log('get API token from eSIMGO error', error);
                        })


                    } else {
                        let response = await axios.get(Constants.API_URL + 'organisation',
                            {
                                headers: {
                                    'X-API-Key': Constants.API_KEY
                                }
                            }
                        )

                        let organisations = response.data.organisations;

                        let condition = {
                            userId: userId
                        }

                        let billingInfo = await Billing.findOne({
                            where: condition
                        });

                        if (organisations && organisations.length > 0) {
                            organisations[0].country = user.country;
                            organisations[0].balance = parseFloat(billingInfo.balance) || 0;
                            organisations[0].taxNumber = billingInfo.taxNumber || '';
                            organisations[0].billingFirstNames = billingInfo.billingFirstNames || '';
                            organisations[0].billingSurname = billingInfo.billingSurname || '';
                            organisations[0].billingAddr1 = billingInfo.billingAddr1 || '';
                            organisations[0].billingAddr2 = billingInfo.billingAddr2 || '';
                            organisations[0].billingCity = billingInfo.billingCity || '';
                            organisations[0].billingPostcode = billingInfo.billingPostcode || '';
                            organisations[0].billingState = billingInfo.billingState || '';
                            organisations[0].registeredCountry = billingInfo.registeredCountry || '';
                            // organisations[0].maxSpend = 2000;
                            organisations[0].minimumSpend = 25;
                            
                        }

                        res.send({
                            success: true,
                            organisations: organisations,
                            user: user
                        });
                    }
                } else {
                    res.status(404).send({
                        success: false,
                        message: `Cannot find user with id=${userId}.`
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    message: "Error finding user with id=" + userId
                });
            });

    } catch (error) {
        console.log('getOrganisations error', error)
        return {}
    }
};