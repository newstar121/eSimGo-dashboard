const { USER_ROLE } = require("../../utils/constants");
const db = require("../models");
const Billing = db.billing;
const History = db.history;
const jwt_decode = require('jwt-decode')

// Find billing info

exports.findOne = (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt_decode(token);
        const userId = decoded.id;

        const condition = country ? {
            userId: userId
        } : null

        Billing.findOne({
            where: condition
        }).then(billing => {

            if (billing) {
                res.send({
                    success: true,
                    billing: billing
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: `Cannot find billing info with userId=${userId}.`
                });
            }
        })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: "Error finding billing info with userId=" + userId
                });
            });
    } catch (error) {
        console.log('get Billing info error', error)
    }
};

exports.update = (req, res) => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt_decode(token);
        const userId = decoded.id;
        const role = decoded.role;

        const condition = {
            userId: userId
        }

        if (role == USER_ROLE.company) {
            axios.put(
                API_URL + 'organisations',
                {
                    accountManager: null,
                    addr1: null,
                    addr2: null,
                    allowRefunds: null,
                    apiMaxBurst: null,
                    apiTokenReplenishAmount: null,
                    apiTokenReplenishTimeSeconds: null,
                    apiTokensPerCall: null,
                    autoTopupAmount: null,
                    balance: null,
                    balanceNotificationEmails: null,
                    balanceReason: null,
                    billingAddr1: address1,
                    billingAddr2: address2,
                    billingCity: city,
                    billingEmail: null,
                    billingFirstNames: firstName,
                    billingPhone: null,
                    billingPostcode: postcode,
                    billingState: "",
                    billingSurname: lastName,
                    businessType: null,
                    callbackUrl: null,
                    callbackVersion: null,
                    city: null,
                    closedDate: null,
                    country: null,
                    currency: null,
                    customTerms: null,
                    groups: groups,
                    id: id || '',
                    isAdmin: null,
                    isClosedDown: null,
                    isOnboarded: null,
                    isPrepaid: null,
                    maxSpend: null,
                    maximumRefundPeriod: null,
                    minimumBalance: null,
                    minimumSpend: null,
                    name: "Clowdnet Services Ltd",
                    notes: null,
                    orgBalanceThreshold: null,
                    postcode: null,
                    productDescription: null,
                    registeredCountry: country,
                    secondStageValidation: null,
                    secondStageValidationComplete: null,
                    sendBillingUpdateEmail: null,
                    suspendPayments: null,
                    taxNumber: null,
                    tradingName: null,
                    website: null
                },
                {
                    headers: {
                        'X-API-Key': API_KEY,
                        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
                    }
                }
            ).then((result) => {
                res.send({
                    success: true
                })
            }).catch((err) => {
                console.log('update user in esim error')
                res.status(500).send({
                    success: false,
                    message: "Update billing info error"
                });
            })
        } else {

            const billingInfo = {
                ...req.body,
                userId: userId
            }
            Billing.findOne({
                where: condition
            }).then(billing => {

                if (billing) {
                    billing.update(billingInfo).then((result) => {
                        res.send({
                            success: true
                        })
                    })
                } else {
                    Billing.create(billingInfo).then((result) => {
                        res.send({
                            success: true
                        })
                    })
                }
            }).catch((err) => {
                console.log('find user in billing error')
                res.status(500).send({
                    success: false,
                    message: "Update billing info error"
                });
            })
        }

    } catch (error) {
        console.log('Update billing info error', error)
        res.status(500).send({
            success: false,
            message: "Update billing info error"
        });
    }
}

exports.topup = (req, res) => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt_decode(token);
        const userId = decoded.id;
        const role = decoded.role;

        const condition = {
            userId: userId
        }

        if (role == USER_ROLE.company) {

        } else {

            Billing.findOne({
                where: condition
            }).then(billing => {

                if (billing) {

                    const balance = parseFloat(billing.balance) || 0;
                    const billingInfo = parseFloat(req.body.topup) || 0
                    const update_balance = balance + billingInfo;

                    billing.update({
                        balance: update_balance
                    }).then((result) => {
                        History.create({
                            userId: userId,
                            value: billingInfo
                        });
                        res.send({
                            success: true
                        })
                    })
                } else {
                    res.status(404).send({
                        success: false,
                        message: 'user not found'
                    })
                }
            }).catch((err) => {
                console.log('find user in billing error')
                res.status(500).send({
                    success: false,
                    message: "Update billing info error"
                });
            })
        }

    } catch (error) {
        console.log('Update billing info error', error)
        res.status(500).send({
            success: false,
            message: "Update billing info error"
        });
    }
}