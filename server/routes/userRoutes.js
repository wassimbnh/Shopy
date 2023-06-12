const { Router} = require('express')
const route  = Router()
const userController = require('../controllers/userController')
const auth = require("../helpers/auth")

route.post('/register', userController.register);
route.post('/activation', userController.activate);
route.post('/sign-in', userController.signin);
route.post('/access', userController.access);
route.post('/forgot-password', userController.forgetPassword);
route.post('/reset-password',auth, userController.resetPassword);
route.get('/user-info',auth, userController.getUserInfo);
route.patch('/update-user', auth , userController.updateUserInfo);


module.exports = route;