const { Router} = require('express')
const route  = Router()
const userController = require('../controllers/userController')

route.post('/register', userController.register);
route.post('/activation', userController.activate);
route.post('/sign-in', userController.signin);
route.post('/access', userController.access);
route.post('/forgot-password', userController.forgetPassword);


module.exports = route;