const express = require('express');
const {
  fetchNotice,
  addNotice,
  updateNotice,
  deleteNotice,
  fetchSingleNotice,
} = require('../controller/noticeController');
const { isAuthenticated, restrictedTo, Roles } = require('../middleware/isAuthenticated');
const catchError = require('../util/catchError');
const { singleUpload } = require('../middleware/multerConfig');


const router = express.Router();

router
  .route('/notices')
  .get(catchError(fetchNotice))
  .post(isAuthenticated, restrictedTo(Roles.Admin), singleUpload, catchError(addNotice));
router
  .route('/notices/:id')
  .get(catchError(fetchSingleNotice))
  .patch(isAuthenticated, restrictedTo(Roles.Admin), singleUpload, catchError(updateNotice))
  .delete(isAuthenticated, restrictedTo(Roles.Admin), catchError(deleteNotice));

module.exports = router;
