const {isLogin,verifyToken, logout} = require('../controller/authController');
const { isAuthenticated, restrictedTo, Roles } = require('../middleware/isAuthenticated');
const loginRateLimiter = require('../middleware/rateLimiter');
const catchError = require('../util/catchError')

const router = require('express').Router()
router.route('/login').post( loginRateLimiter, catchError(isLogin))
router.route("/verify").get(isAuthenticated, restrictedTo(Roles.Admin), catchError(verifyToken));
router.route('/logout').post(catchError(logout))



module.exports = router