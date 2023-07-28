const db = require("../models");
const User = db.user;
const jwt_decode = require('jwt-decode');
const Constants = require("../../utils/constants");
const axios = require("axios");

exports.getOrganisation = (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt_decode(token);
        const userId = decoded.id;
        const role = decoded.role || Constants.USER_ROLE.user;
        // Get API token from eSIMGO
        // const base64EncodedString = Buffer.from(user.username + ':' + user.password, 'utf-8').toString('base64');
        // axios.get(Constants.API_URL + 'login',
        //     {
        //         headers: {
        //             'Authorization': 'Basic ' + base64EncodedString,
        //         }
        //     }
        // ).then((response) => {
        // 
        // }).catch(error => {
        //     res.status(201).send({
        //         success: false,
        //         message: 'Login eSIMGO failed'
        //     });
        //     console.log('get API token from eSIMGO error', error);
        // })

        if (role == Constants.USER_ROLE.company) {

            axios.get(API_URL + 'organisations/current',
                {
                    params: {
                        id: 'current'
                    },
                    headers: {
                        'X-API-Key': API_KEY,
                        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
                    }
                }
            ).then((result) => {
                res.send({
                    success: true,
                    organisations: result.organisations || [],
                    user: result.user || {}
                });
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    message: "erroring get organisations data from esimgo"
                });
            });


        } else {
            User.findByPk(userId)
                .then(async user => {

                    if (user) {
                        let response = await axios.get(Constants.API_URL + 'organisation',
                            {
                                headers: {
                                    'X-API-Key': Constants.API_KEY
                                }
                            }
                        )

                        let organisations = response.data.organisations;

                        res.send({
                            success: true,
                            organisations: organisations,
                            user: user
                        });
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
        }




    } catch (error) {
        console.log('getOrganisations error', error)
        return {}
    }
};