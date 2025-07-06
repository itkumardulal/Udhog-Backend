module.exports = (sequelize , DataTypes ) => {
    const Notice = sequelize.define('notice' , {
        id:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },

        description:{
            type:DataTypes.STRING,
            allowNull:false
        },

        pdfUrl:{
            type:DataTypes.STRING,
            allowNull:false
        },
        pdfName:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    return Notice
}

