module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user',{
        id:{
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
            allowNull: false,
            validate: {
                isIn: {
                        args: [['admin', 'user']],
                        msg: 'Role must be either admin or user'
    }
  }
}

    })
    return User
}