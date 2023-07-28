const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../keys');
const Constants = require("../../utils/constants");

// Create a new user

exports.create = (req, res) => {
    // Validate request

    if (!req.body.firstName || req.body.firstName.length == 0) {
        return res.status(201).send({
            success: false,
            message: "FirstName is empty!"
        });
    }

    if (!req.body.lastName || req.body.lastName.length == 0) {
        return res.status(201).send({
            success: false,
            message: "LastName is empty!"
        });
    }

    if (!req.body.email || req.body.email.length == 0) {
        return res.status(201).send({
            success: false,
            message: "Email is empty!"
        });
    }

    if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return res.status(201).send({
            success: false,
            message: "Email is invalid"
        });
    }

    if (!req.body.country || req.body.country.length == 0) {
        return res.status(201).send({
            success: false,
            message: "Country is empty!"
        });
    }

    if (!req.body.password || req.body.password.length == 0) {
        return res.status(201).send({
            success: false,
            message: "Password is empty!"
        });
    }

    const { firstName, lastName, email, country, password } = req.body;

    try {
        const condition = { username: email };
        User.findOne({
            where: condition
        }).then(data => {
            if (data) {
                return res.status(201).send({
                    success: false,
                    message: "User already exist."
                });
            } else {
                // Create a User

                bcrypt.genSalt(10, (error, salt) => {
                    if (error) {
                        console.log('bcrypt genSalt error', error)
                        return res.status(404).send({
                            success: false,
                            message: "bycrypt genSalt error."
                        });
                    }
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        const user = {
                            firstName: firstName,
                            lastName: lastName,
                            username: email,
                            password: hash,
                            country: country,
                            role: Constants.USER_ROLE.user
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
                                    success: false,
                                    message: "Some error occurred while creating a User."
                                });
                            });
                    })
                })
            }
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Some error occurred while creating a User."
        });
    }
};

// Get all users

exports.findAll = (req, res) => {

    const username = req.query.username;
    var condition = username ? { username: username } : null;

    User.findAll({ where: condition })
        .then(users => {
            res.send({
                success: false,
                users: users,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single user by id

exports.findOne = (req, res) => {

    const id = req.params.id;

    User.findByPk(id)
        .then(user => {

            if (user) {
                res.send({
                    success: true,
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

    const condition = username ? { username: username } : null;
    User.findOne({
        where: condition
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                    // Sign Token
                    const payload = { id: user.id, username: user.username, role: user.role }; // Create JWT Payload
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 * 24 },
                        (err, token) => {
                            res.send({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    );

                } else {
                    res.status(201).send({
                        success: false,
                        message: 'Password is not correct.'
                    });
                }
            });
        } else {
            res.status(404).send({
                success: false,
                message: `Cannot find User with username=${username}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: "Error retrieving User with username=" + username
        });
    });
}