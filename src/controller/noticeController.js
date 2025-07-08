const { where } = require("sequelize")
const { notices } = require("../database/connection")

const addNotice = async (req,res) =>{

    const {title,description,pdfUrl,pdfName} =req.body
    if(!title || !description ) {
        return res.status(400).json({
            message:'please provide above details'
        })
    }
    await notices.create({
        title,
        description,
        pdfUrl,
        pdfName
    })

    return res.status(201).json({
        message:'notice added successfully'
    })
}

const fetchNotice = async (req,res) =>{
const data =await notices.findAll()
return res.status(200).json({
    message:'notice fetched successfully',
    data
})
}

const updateNotice = async (req,res) =>{
  
    const {id} = req.params
    const {title,description,pdfUrl,pdfName } = req.body
    if(!title || !description) {
        return res.status(400).json({
            message:'please provide above description'
        })
    }
    const data = await notices.update ({
        title,
        description,
        pdfUrl,
        pdfName
    },{
        where:{
            id
        }
    })
   return res.status(200).json({
        message:'notice update successfully',
        data
    })
}

const deleteNotice = async (req,res) =>{
    const {id} =req.params
    await notices.destroy({
        where:{
            id
        }
    })
    return res.status(200).json({
        message:'notice deleted successfully'
    })
}

const fetchSingleNotice = async (req,res) =>{
    const {id} = req.params
    const data = await notices.findByPk({
        where:{
            id
        }
    })
    res.status(200).json({
        message:'single notice fetched successfully',
        data
    })
}
module.exports = {addNotice,fetchNotice,updateNotice,deleteNotice,fetchSingleNotice}