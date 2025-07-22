const {
  fetchNews,
  addNews,
  updateNews,
  deleteNews,
  fetchSingleNews,
} = require("../controller/newsController");
const {
  isAuthenticated,
  restrictedTo,
  Roles,
} = require("../middleware/isAuthenticated");
const { singleUpload } = require("../middleware/multerConfig");

const catchError = require("../util/catchError");

const router = require("express").Router();
router
  .route("/news")
  .get(catchError(fetchNews))
  .post(isAuthenticated, restrictedTo("admin"), singleUpload, catchError(addNews));
router
  .route("/news/:id")
  .get(catchError(fetchSingleNews))
  .patch(isAuthenticated, restrictedTo("admin"), singleUpload, catchError(updateNews))
  .delete(isAuthenticated, restrictedTo("admin"), catchError(deleteNews));

module.exports = router;
