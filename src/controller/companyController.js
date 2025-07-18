const { Op, Sequelize } = require("sequelize");
const { companies } = require("../database/connection");

const addCompanyDetails = async (req, res) => {
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
    registrationUrl,
    registrationName,
    citizenshipFrontUrl,
    citizenshipFrontName,
    citizenshipBackUrl,
    citizenshipBackName,
    photoUrl,
    photoName,
    leadershipGender,
  } = req.body;

  if (
    !companyNameEng ||
    !contactPerson ||
    !address
  ) {
    return res.status(400).json({
      message:
        "Please provide all required fields"
    });
  }

  const VAT = vat || null;
  const PAN = vat ? null : pan;

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
    registrationUrl,
    registrationName,
    citizenshipFrontUrl,
    citizenshipFrontName,
    citizenshipBackUrl,
    citizenshipBackName,
    photoUrl,
    photoName,
    leadershipGender,
  });

  return res.status(201).json({
    message: "Company details added successfully",
  });
};

const fetchCompanyLimitedData = async (req, res) => {
  const data = await companies.findAll();
  const limitedData = data.map((company) => ({
    membershipNo: company.membershipNo,
    registrationNo: company.registrationNo,
    companyNameEng: company. companyNameEng,
    email:company.email,
    address: company.address,
    organizationType: company.organizationType,
    industryType: company.industryType,
    contactPerson: company.contactPerson,
    phoneNo: company.phoneNo,
    vat: company.vat,
    pan: company.pan,
    numberOfEmployees: company.numberOfEmployees,
    renewStatus: company.renewStatus,
  }));
  res.status(200).json({
    message: " companies data fetched successfully",
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

const updateCompanyDetails = async (req, res) => {
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
    registrationUrl,
    registrationName,
    citizenshipFrontUrl,
    citizenshipFrontName,
    citizenshipBackUrl,
    citizenshipBackName,
    photoUrl,
    photoName,
    leadershipGender,
  } = req.body;

  if (
    !companyNameEng ||
    !contactPerson ||
    !address
  ) {
    return res.status(400).json({
      message:
        "Please provide all required fields, including either VAT or PAN.",
    });
  }

  const VAT = vat || null;
  const PAN = vat ? null : pan;

  const [updated] = await companies.update(
    {
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
      registrationUrl,
      registrationName,
      citizenshipFrontUrl,
      citizenshipFrontName,
      citizenshipBackUrl,
      citizenshipBackName,
      photoUrl,
      photoName,
      leadershipGender,
    },
    {
      where: { id },
    }
  );

  if (updated === 0) {
    return res.status(404).json({ message: "Company not found" });
  }

  const data = await companies.findByPk(id);

  return res.status(200).json({
    message: "Company details updated successfully",
    data,
  });
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
  fetchCompanyLimitedData
};
