const {
  fetchCompanyDetails,
  addCompanyDetails,
  updateCompanyDetails,
  deleteCompanyDetails,
  fetchSingleCompanyDetails,
  searchCompanyByName,
  fetchCompanyLimitedData,
} = require("../controller/companyController");
const {
  isAuthenticated,
  restrictedTo,
  Roles,
} = require("../middleware/isAuthenticated");
const { multiUpload } = require("../middleware/multerConfig");
const catchError = require("../util/catchError");

const router = require("express").Router();
router.route("/company/public").get(catchError(fetchCompanyLimitedData));

router
  .route("/company")
  .get(isAuthenticated,restrictedTo(Roles.Admin), catchError(fetchCompanyDetails))
  .post(
    isAuthenticated,
    restrictedTo(Roles.Admin),
    multiUpload,
    addCompanyDetails
  );

router.route("/company/search").get(catchError(searchCompanyByName));

router
  .route("/company/:id")
  .get(catchError(fetchSingleCompanyDetails))
  .delete(
    isAuthenticated,
    restrictedTo(Roles.Admin),
    catchError(deleteCompanyDetails)
  )
  .patch(
    isAuthenticated,
    restrictedTo(Roles.Admin),
    multiUpload, 
    updateCompanyDetails
  );

module.exports = router;
