const { fetchNotice, addNotice, updateNotice, deleteNotice, fetchSingleNotice } = require('../controller/noticeController')
const { isAuthenticated, restrictedTo, Roles } = require('../middleware/isAuthenticated')
const catchError = require('../util/catchError')

const router = require('express').Router()

router.route('/notices').get(catchError(fetchNotice)).post(isAuthenticated, restrictedTo(Roles.Admin), catchError(addNotice))
router.route('/notices/:id').get(catchError(fetchSingleNotice)).delete(isAuthenticated, restrictedTo(Roles.Admin), catchError(deleteNotice)).patch(isAuthenticated, restrictedTo(Roles.Admin), catchError(updateNotice))

module.exports = router