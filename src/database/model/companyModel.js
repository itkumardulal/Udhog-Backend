module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("company", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    registrationNo: {
      type: DataTypes.STRING,

      unique: true,
    },

    membershipNo: {
      type: DataTypes.STRING,
      
      unique: true,
    },

    companyNameEng: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    companyNameNep: {
      type: DataTypes.STRING,
     
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      
      unique: true,
    },

    organizationType: {
      type: DataTypes.STRING,
     
    },

    industryType: {
      type: DataTypes.STRING,
      
    },

    

    contactPerson: {
      type: DataTypes.STRING,
     
    },

    phoneNo: {
      type: DataTypes.STRING(10),
    
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
      
    },

    renewStatus: {
      type: DataTypes.STRING,
     
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
     
    },

    address:{
      type:DataTypes.STRING,
      allowNull:false
    },

    telPhone:{
      type:DataTypes.STRING,
      
    },

    membershipDate: {
      type: DataTypes.DATE,
    
    },

    membershipType: {
      type: DataTypes.STRING,
      
    },

    businessNature: {
      type: DataTypes.STRING,
      
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
