module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("company", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    registrationNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    membershipNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    companyNameEng: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    companyNameNep: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    organizationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    industryType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    

    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phoneNo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: false,
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },

    vat: {
      type: DataTypes.STRING,
    },

    pan: {
      type: DataTypes.STRING,
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  

    numberOfEmployees: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    renewStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Active", "Inactive"]],
          msg: "renewStatus must be either active or inactive",
        },
      },
    },

    description: {
      type: DataTypes.TEXT,
    },

    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    address:{
      type:DataTypes.STRING,
      allowNull:false
    },

    telPhone:{
      type:DataTypes.STRING,
      allowNull:false
    },

    membershipDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    membershipType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    businessNature: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    registrationUrl: {
      type: DataTypes.STRING,
    },

    registrationName: {
      type: DataTypes.STRING,
    },

    leadershipGender:{
      type:DataTypes.STRING
    },

    citizenshipFrontUrl: {
      type: DataTypes.STRING,
    },

    citizenshipFrontName: {
      type: DataTypes.STRING,
    },

    citizenshipBackUrl: {
      type: DataTypes.STRING,
    },

    photoUrl: {
      type: DataTypes.STRING,
    },

    photoName: {
      type: DataTypes.STRING,
    },

    
  });
  return Company;
};
