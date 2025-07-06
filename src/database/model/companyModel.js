module.exports = (sequelize , DataTypes ) =>{
    const Company  = sequelize.define ('company',{
       id: {
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
       },


       registrationNo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
       },

       companyNameEng:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
       },

       companyNameNep:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
       },

       email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
       },

       organizationType:{
        type:DataTypes.STRING,
        allowNull:false
       },
       
       industry:{
        type:DataTypes.STRING,
        allowNull:false
       },

       contactPerson:{
        type:DataTypes.STRING,
        allowNull:false
       },

       phoneNo:{
        type:DataTypes.STRING(10),
        allowNull:false,
        unique:false,
        validate:{
            isNumeric:true,
            len:[10,10]
        }
       },

       VAT:{
        type:DataTypes.STRING
       },
       
       PAN:{
        type:DataTypes.STRING
       },

       annualRevenue:{
        type:DataTypes.STRING,
        allowNull:false
       },

       numberOfEmployees:{
        type:DataTypes.STRING,
        allowNull:false
       },

       renewStatus:{
        type:DataTypes.STRING,
        allowNull:false,
         validate: {
                isIn: {
                        args: [['Active', 'Inactive']],
                        msg: 'renewStatus must be either active or inactive'
                        }    
                    }
                    
        },

        pdfUrl:{
            type:DataTypes.STRING,
            
        },

        pdfName:{
            type:DataTypes.STRING,
            
        }

    })
    return Company
}