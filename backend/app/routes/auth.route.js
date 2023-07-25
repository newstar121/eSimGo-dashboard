const users = require('../controllers/user.controller');

const express = require('express')

const auth = express.Router()

auth.post('/login', users.findOneByUsernameAndPassword)
auth.post('/register', users.create)

module.exports = auth;