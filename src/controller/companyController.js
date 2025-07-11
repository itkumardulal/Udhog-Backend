const { Op, Sequelize } = require("sequelize");
const { companies } = require("../database/connection");

const addCompanyDetails = async (req, res) => {
  const {
    registrationNo,
    companyNameEng,
    companyNameNep,
    email,
    organizationType,
    industry,
    contactPerson,
    phoneNo,
    numberOfEmployees,
    renewStatus,
    annualRevenue,
    vat,
    pan,
    pdfUrl,
    pdfName,
    description,
    registrationDate,
    membershipDate,
    membershipNo,
  } = req.body;

  if (
    !registrationNo ||
    !companyNameEng ||
    !companyNameNep ||
    !email ||
    !organizationType ||
    !industry ||
    !contactPerson ||
    !phoneNo ||
    !numberOfEmployees ||
    !renewStatus ||
    !annualRevenue ||
    (!vat && !pan) ||
    !membershipNo ||
    !registrationDate ||
    !membershipDate
  ) {
    return res.status(400).json({
      message:
        "Please provide all required fields, including either VAT or PAN.",
    });
  }

  const VAT = vat || null;
  const PAN = vat ? null : pan;

  await companies.create({
    registrationNo,
    companyNameEng,
    companyNameNep,
    email,
    organizationType,
    industry,
    contactPerson,
    phoneNo,
    numberOfEmployees,
    annualRevenue,
    renewStatus,
    vat: VAT,
    pan: PAN,
    pdfUrl,
    pdfName,
    description,
    registrationDate,
    membershipDate,
    membershipNo,
  });

  return res.status(201).json({
    message: "Company details added successfully",
  });
};

const fetchCompanyDetails = async (req, res) => {
  const data = await companies.findAll();
  return res.status(200).json({
    message: "companies data fetched successfully",
    data,
  });
};

const updateCompanyDetails = async (req, res) => {
  const { id } = req.params;
  const {
    registrationNo,
    companyNameEng,
    companyNameNep,
    email,
    organizationType,
    industry,
    contactPerson,
    phoneNo,
    numberOfEmployees,
    renewStatus,
    annualRevenue,
    vat,
    pan,
    pdfUrl,
    pdfName,
    description,
    registrationDate,
    membershipDate,
    membershipNo,
  } = req.body;

  if (
    !registrationNo ||
    !companyNameEng ||
    !companyNameNep ||
    !email ||
    !organizationType ||
    !industry ||
    !contactPerson ||
    !phoneNo ||
    !numberOfEmployees ||
    !renewStatus ||
    !annualRevenue ||
    (!vat && !pan) ||
    !membershipNo ||
    !registrationDate ||
    !membershipDate
  ) {
    return res.status(400).json({
      message:
        "Please provide all required fields, including either VAT or PAN.",
    });
  }

  const VAT = vat || null;
  const PAN = vat ? null : pan;

  await companies.update(
    {
      registrationNo,
      companyNameEng,
      companyNameNep,
      email,
      organizationType,
      industry,
      contactPerson,
      phoneNo,
      numberOfEmployees,
      annualRevenue,
      renewStatus,
      vat: VAT,
      pan: PAN,
      pdfUrl,
      pdfName,
      description,
      registrationDate,
      membershipDate,
      membershipNo,
    },
    {
      where: { id },
    }
  );

  const data = await companies.findByPk(id);

  return res.status(200).json({
    message: "details of companies updated successfully",
    data,
  });
};

const deleteCompanyDetails = async (req, res) => {
  const { id } = req.params;
  await companies.destroy({
    where: {
      id,
    },
  });

  return res.status(200).json({
    message: "company deleted successfully",
  });
};

const searchCompanyByName = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({
      message: "Query parameter 'q' is required for searching",
    });
  }

  try {
    const data = await companies.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('companyNameEng')),
        {
          [Op.like]: `%${q.toLowerCase()}%`
        }
      )
    });

    if (!data || data.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error searching company by name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
  searchCompanyByName
};
