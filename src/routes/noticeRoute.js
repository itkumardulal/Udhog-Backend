const { fetchNotice, addNotice, updateNotice, deleteNotice, fetchSingleNotice } = require('../controller/noticeController')
const catchError = require('../util/catchError')

const router = require('express').Router()

router.route('/notices').get(catchError(fetchNotice)).post(catchError(addNotice)).patch(catchError(updateNotice)).delete(catchError(deleteNotice))
router.route('/notices/:id').get(catchError(fetchSingleNotice))

module.exports = router