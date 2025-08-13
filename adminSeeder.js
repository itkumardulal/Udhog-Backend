const bcrypt = require('bcrypt')
const { seederConfig } = require('./src/config/config')
const { users } = require('./src/database/connection')
const adminSeeder = async (req,res)=>{
    const [data] = await  users.findAll({
        where:{
            email:seederConfig.email
        }
    })
    if(!data){
        await users.create({
            email:seederConfig.email,
            password:bcrypt.hashSync(seederConfig.password,12),
            role:'admin',
            username:'admin'
        })
        console.log('admin credentials seeded successfully')
    }
    else{
        console.log('admin credentials already seeded')
    }
}

module.exports = adminSeeder