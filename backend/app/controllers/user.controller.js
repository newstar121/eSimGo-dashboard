const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../keys');
const Constants = require("../../utils/constants");
const { default: axios } = require("axios");
// Create and Save a new Plan
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            success: false,
            message: "Username is empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            success: false,
            message: "Password is empty!"
        });
        return;
    }

    const { username, password, role } = req.body;

    // Create a User

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const user = {
                username: username,
                password: hash,
                role: role ? role : Constants.USER_ROLE.user
            };

            // Save Tutorial in the database
            User.create(user)
                .then(data => {
                    res.send({
                        success: true,
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Some error occurred while creating a User."
                    });
                });
        })
    })
};

// Retrieve all Plans from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: username } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Plan with an id
exports.findOne = (req, res) => {
    //     const id = req.params.id;

    //   User.findByPk(id)
    //     .then(data => {
    //       if (data) {
    //         res.send(data);
    //       } else {
    //         res.status(404).send({
    //           message: `Cannot find Tutorial with id=${id}.`
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       res.status(500).send({
    //         message: "Error retrieving Tutorial with id=" + id
    //       });
    //     });

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

// Find one by username and password
exports.findOneByUsernameAndPassword = (req, res) => {
    const { username, password } = req.body;

    var condition = username ? { username: username } : null;
    User.findOne({
        where: condition
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // Get API token from eSIMGO
                    // const base64EncodedString = Buffer.from(user.username + ':' + user.password, 'utf-8').toString('base64');
                    // axios.get(Constants.API_URL + 'login',
                    //     {
                    //         headers: {
                    //             'Authorization': 'Basic ' + base64EncodedString,
                    //         }
                    //     }
                    // ).then((response) => {
                        // Sign Token
                        const payload = { id: user.id, username: user.username, role: user.role }; // Create JWT Payload
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.send({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    // }).catch(error => {
                    //     res.status(201).send({
                    //         success: false,
                    //         message: 'Login eSIMGO failed'
                    //     });
                    //     console.log('get API token from eSIMGO error', error);
                    // })

                } else {
                    res.status(201).send({
                        success: false,
                        message: 'Password is not correct.'
                    });
                }
            });
        } else {
            res.status(404).send({
                message: `Cannot find User with username=${username}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving User with username=" + username
        });
    });
}