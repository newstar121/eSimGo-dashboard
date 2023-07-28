const users = require('../controllers/user.controller');
const plans = require('../controllers/plan.controller');
const esims = require('../controllers/esim.controller');
const billing = require('../controllers/billing.controller');
const express = require('express')
const passport = require('passport');

const user = express.Router()

user.post('/add_plan', plans.create)
// user.get('/get_plans', passport.authenticate('jwt', {session: false}), plans.findAll)
user.get('/get_plans', plans.findAll)
// user.get('/get_organisations', passport.authenticate('jwt', {session: false}), esims.getOrganisation)
user.get('/get_organisations', esims.getOrganisation)
user.post('/create', users.create)

user.get('get_billing', billing.findOne)

module.exports = user;