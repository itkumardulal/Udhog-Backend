const isLogin = require('../controller/authController')
const { isAuthenticated, restrictedTo, Roles } = require('../middleware/isAuthenticated')
const catchError = require('../util/catchError')

const router = require('express').Router()
router.route('/login').post( catchError(isLogin))

module.exports = router