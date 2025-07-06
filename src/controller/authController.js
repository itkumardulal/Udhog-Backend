const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretConfig } = require('../config/config')
const { users } = require('../database/connection')
const isLogin = async (req ,res) =>{
    if(!req.body){
        return res.status(400).json({
            message:'please provide above details'
        })
    }
    const {email,password} = req.body
    if(!email || !password ){
        return res.status(400).json({
            message:'please provide email and password'
        })
    }

    const data = await users.findOne({
        where:{
            email
        }
    })
    if(!data){
        return res.status(400).json({
            message:'no user belonging with that email id'
        })
    }

    const isAuthenticated = bcrypt.compareSync(password,data.password)
    if(!isAuthenticated){
        return res.status(400).json({
            message:"incorrect email or password"
        })
    }

    const token = jwt.sign({id:data.id},secretConfig.secretKey, {
        expiresIn:'7d'
    })

    return res.status(200).json({
        message:"login sucessfully",
        token:token
    })
}

module.exports = isLogin