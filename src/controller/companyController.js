const { Op, Sequelize } = require("sequelize");
const { companies } = require("../database/connection");
const uploadToR2 = require("../util/r2Upload");

// Handle R2 upload logic for multiple file fields
const extractUploadResults = async (files) => {
  const results = {
    photoUrl: null,
    photoName: null,
    citizenshipFrontUrl: null,
    citizenshipFrontName: null,
    citizenshipBackUrl: null,
    citizenshipBackName: null,
    registrationUrl: null,
    registrationName: null,
  };

  for (const [field, fileArray] of Object.entries(files || {})) {
    if (fileArray.length > 0) {
      const uploaded = await uploadToR2(fileArray[0]);
      switch (field) {
        case "photo":
          results.photoUrl = uploaded.fileUrl;
          results.photoName = uploaded.fileName;
          break;
        case "citizenshipFront":
          results.citizenshipFrontUrl = uploaded.fileUrl;
          results.citizenshipFrontName = uploaded.fileName;
          break;
        case "citizenshipBack":
          results.citizenshipBackUrl = uploaded.fileUrl;
          results.citizenshipBackName = uploaded.fileName;
          break;
        case "registration":
          results.registrationUrl = uploaded.fileUrl;
          results.registrationName = uploaded.fileName;
          break;
      }
    }
  }

  return results;
};

const addCompanyDetails = async (req, res) => {
  try {
    const {
      registrationNo,
      membershipNo,
      companyNameEng,
      companyNameNep,
      email,
      organizationType,
      industryType,
      contactPerson,
      phoneNo,
      numberOfEmployees,
      renewStatus,
      capital,
      vat,
      pan,
      description,
      registrationDate,
      address,
      telPhone,
      membershipDate,
      membershipType,
      businessNature,
      leadershipGender,
    } = req.body;

    if (!companyNameEng || !contactPerson || !address) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const VAT = vat || null;
    const PAN = vat ? null : pan;

    const {
      photoUrl,
      photoName,
      citizenshipFrontUrl,
      citizenshipFrontName,
      citizenshipBackUrl,
      citizenshipBackName,
      registrationUrl,
      registrationName,
    } = await extractUploadResults(req.files);

    await companies.create({
      registrationNo,
      membershipNo,
      companyNameEng,
      companyNameNep,
      email,
      organizationType,
      industryType,
      contactPerson,
      phoneNo,
      numberOfEmployees,
      renewStatus,
      capital,
      vat: VAT,
      pan: PAN,
      description,
      registrationDate,
      address,
      telPhone,
      membershipDate,
      membershipType,
      businessNature,
      leadershipGender,
      photoUrl,
      photoName,
      citizenshipFrontUrl,
      citizenshipFrontName,
      citizenshipBackUrl,
      citizenshipBackName,
      registrationUrl,
      registrationName,
    });

    return res.status(201).json({
      message: "Company details added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const fetchCompanyLimitedData = async (req, res) => {
  const data = await companies.findAll();
  const limitedData = data.map((company) => ({
    membershipNo: company.membershipNo,
    registrationNo: company.registrationNo,
    companyNameEng: company.companyNameEng,
    email: company.email,
    address: company.address,
    organizationType: company.organizationType,
    industryType: company.industryType,
    contactPerson: company.contactPerson,
    phoneNo: company.phoneNo,
    numberOfEmployees: company.numberOfEmployees,
    renewStatus: company.renewStatus,
  }));
  res.status(200).json({
    message: "companies data fetched successfully",
    data: limitedData,
  });
};

const fetchCompanyDetails = async (req, res) => {
  const data = await companies.findAll();
  return res.status(200).json({
    message: "Companies data fetched successfully",
    data,
  });
};

// Helper to sanitize URL fields to strings or null
function sanitizeUrl(value, fallback) {
  if (typeof value === "string") return value;
  if (typeof fallback === "string") return fallback;
  return null;
}

const updateCompanyDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      registrationNo,
      membershipNo,
      companyNameEng,
      companyNameNep,
      email,
      organizationType,
      industryType,
      contactPerson,
      phoneNo,
      numberOfEmployees,
      renewStatus,
      capital,
      vat,
      pan,
      description,
      registrationDate,
      address,
      telPhone,
      membershipDate,
      membershipType,
      businessNature,
      leadershipGender,
      registrationUrl,
      citizenshipFrontUrl,
      citizenshipBackUrl,
      photoUrl,
    } = req.body;

    if (!companyNameEng || !contactPerson || !address) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Fetch existing company to get current image URLs
    const existingCompany = await companies.findByPk(id);
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Determine VAT/PAN values
    const VAT = vat || null;
    const PAN = vat ? null : pan;

    // Extract uploaded files from request.files
    const uploadResults = await extractUploadResults(req.files);

    // Prepare updated data with sanitized URL fields
    const updatedData = {
      registrationNo,
      membershipNo,
      companyNameEng,
      companyNameNep,
      email,
      organizationType,
      industryType,
      contactPerson,
      phoneNo,
      numberOfEmployees,
      renewStatus,
      capital,
      vat: VAT,
      pan: PAN,
      description,
      registrationDate,
      address,
      telPhone,
      membershipDate,
      membershipType,
      businessNature,
      leadershipGender,
      registrationUrl: sanitizeUrl(uploadResults.registrationUrl, sanitizeUrl(registrationUrl, existingCompany.registrationUrl)),
      citizenshipFrontUrl: sanitizeUrl(uploadResults.citizenshipFrontUrl, sanitizeUrl(citizenshipFrontUrl, existingCompany.citizenshipFrontUrl)),
      citizenshipBackUrl: sanitizeUrl(uploadResults.citizenshipBackUrl, sanitizeUrl(citizenshipBackUrl, existingCompany.citizenshipBackUrl)),
      photoUrl: sanitizeUrl(uploadResults.photoUrl, sanitizeUrl(photoUrl, existingCompany.photoUrl)),
    };

    const [updated] = await companies.update(updatedData, {
      where: { id },
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    const data = await companies.findByPk(id);

    return res.status(200).json({
      message: "Company details updated successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteCompanyDetails = async (req, res) => {
  const { id } = req.params;
  const deleted = await companies.destroy({
    where: { id },
  });

  if (deleted === 0) {
    return res.status(404).json({ message: "Company not found" });
  }

  return res.status(200).json({
    message: "Company deleted successfully",
  });
};

const searchCompanyByName = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({
      message: "Query parameter 'q' is required for searching",
    });
  }

  const data = await companies.findAll({
    where: Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("companyNameEng")),
      {
        [Op.like]: `%${q.toLowerCase()}%`,
      }
    ),
  });

  return res.status(200).json({
    message: "Search results",
    data,
  });
};

const fetchSingleCompanyDetails = async (req, res) => {
  const { id } = req.params;
  const data = await companies.findByPk(id);

  if (!data) {
    return res.status(404).json({
      message: `Company with id ${id} not found`,
    });
  }

  return res.status(200).json({
    message: "Single company details fetched successfully",
    data,
  });
};

module.exports = {
  addCompanyDetails,
  fetchCompanyDetails,
  updateCompanyDetails,
  deleteCompanyDetails,
  fetchSingleCompanyDetails,
  searchCompanyByName,
  fetchCompanyLimitedData,
};
