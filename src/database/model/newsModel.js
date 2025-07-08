module.exports = (sequelize , DataTypes ) =>{
    const News = sequelize.define ('new',{
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
            },


         title:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },

        description:{
            type:DataTypes.STRING,
            allowNull:false
        },


        imgUrl:{
            type:DataTypes.STRING,
            
        },

        imgName:{
            type:DataTypes.STRING,
            
        }

    })

    return News
}

