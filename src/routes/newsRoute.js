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
const catchError = require("../util/catchError");

const router = require("express").Router();
router
  .route("/news")
  .get(catchError(fetchNews))
  .post(isAuthenticated, restrictedTo(Roles.Admin), catchError(addNews));
router
  .route("/news/:id")
  .get(catchError(fetchSingleNews))
  .patch(isAuthenticated, restrictedTo(Roles.Admin), catchError(updateNews))
  .delete(isAuthenticated, restrictedTo(Roles.Admin), catchError(deleteNews));

module.exports = router;
