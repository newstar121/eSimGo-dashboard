const db = require("../models");
const User = db.user;
const jwt_decode = require('jwt-decode');
const Constants = require("../../utils/constants");
const { axios } = require("axios");

exports.getOrganisation = (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt_decode(token);
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
        User.findByPk(userId)
            .then(async user => {

                if (user) {
                    let res = await axios.get(Constants.API_URL + 'organisation',
                        {
                            headers: {
                                'X-API-Key': Constants.API_KEY
                            }
                        }
                    )

                    let organisations = res.data.organisations;

                    res.send({
                        success: true,
                        organisations: organisations,
                        user: user
                    });
                } else {
                    res.status(404).send({
                        success: false,
                        message: `Cannot find user with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: "Error finding user with id=" + id
                });
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