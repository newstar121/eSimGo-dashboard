const users = require('../controllers/user.controller');
const plans = require('../controllers/plan.controller');
const express = require('express')
const passport = require('passport')

const user = express.Router()

user.post('/add_plan', plans.create)
user.get('/get_plans', passport.authenticate('jwt', {session: false}), plans.findAll)

user.post('/create', users.create)

module.exports = user;