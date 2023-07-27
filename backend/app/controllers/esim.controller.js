const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../keys');
const Constants = require("../../utils/constants");
const { axios } = require("axios");

exports.getOrganisation = (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, keys.secretOrKey);
    const userId = decoded.id;

    try {

        // Get API token from eSIMGO
        // const base64EncodedString = Buffer.from(user.username + ':' + user.password, 'utf-8').toString('base64');
        // axios.get(Constants.API_URL + 'login',
        //     {
        //         headers: {
        //             'Authorization': 'Basic ' + base64EncodedString,
        //         }
        //     }
        // ).then((response) => {
        axios.get(Constants.API_URL + 'organisation',
            {
                headers: {
                    'X-API-Key': Constants.API_KEY
                }
            }
        ).then(async (organisation) => {

        });

        // }).catch(error => {
        //     res.status(201).send({
        //         success: false,
        //         message: 'Login eSIMGO failed'
        //     });
        //     console.log('get API token from eSIMGO error', error);
        // })

    } catch (error) {
        console.log('getOrganisations error', error)
        return {}
    }
};