const { fetchComapanyDetails, addCompanyDetails, updateCompanyDetails, deleteCompanyDetails, fetchSingleCompanyDetails } = require('../controller/companyController')
const { isAuthenticated, restrictedTo, Roles } = require('../middleware/isAuthenticated')
const catchError = require('../util/catchError')

const router = require('express').Router()

router.route('/company').get(catchError(fetchComapanyDetails)).post(catchError(addCompanyDetails))
router.route('/company/:id').get(catchError(fetchSingleCompanyDetails)).delete(isAuthenticated ,restrictedTo(Roles.Admin),catchError(deleteCompanyDetails)).patch(isAuthenticated,restrictedTo(Roles.Admin),catchError(updateCompanyDetails))

module.exports = router