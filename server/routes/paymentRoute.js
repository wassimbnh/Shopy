const { Router} = require('express')
const route  = Router()
const payment = require('../controllers/payment')

route.post("/checkout", payment)

module.exports = route;