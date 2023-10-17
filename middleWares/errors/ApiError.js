const commonResObj = require('../responses/commonResponse')
const logger          = require('../../supports/logger')
const JwtService  =   require('../../services/JwtService');
const mandatoryFields  =   require('../fieldsValidation');

var path = require('path');
var filename = path.basename(__dirname)+"/"+path.basename(__filename);
var registrationProfileNode_serviceUrl = process.env.registrationProfileNode_serviceUrl; 

const  ApiErrors= {

    checkBody:{},
    checkError:{},
    checkUserRole:{},

}



ApiErrors.checkError = (value, req ,res, next ) =>{
    if(value.error){
        let errObj={}
        value.error.details.forEach((obj,index)=>{
            errObj[obj.path[0]]=obj.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        })
        logger.log({ level: "info", message: { fileLocation: "Middlewares/"+filename+" ,ApiErrors.checkError", method:req.method, validationErrors: errObj, Api :registrationProfileNode_serviceUrl+req.url ,status:412} });
        commonResObj(res,412,{validationErrors:errObj })
    }else{ 
        next() 
    }
}

ApiErrors.checkBody = (req,res)=>{
    if(Object.keys(req.body).length === 0){ 
        commonResObj(res,400,{message:"Body required"})
    }else{ return true; }    
}

ApiErrors.checkUserRole  = ( req , res )=>{
    let isRoleExist = false;
    let roles = ["Dealer", "Retailer", "Influencer", "Sales Force", "Contractor", "Engineer"]
    roles.forEach(role=>{
        if(role == req.body.role){
            isRoleExist =true
        }
    })
    if(isRoleExist){
        return isRoleExist
    }else{
        logger.log({ level: "info", message: { fileLocation: "Middlewares/"+filename+" ,ApiErrors.checkUserRole", method:req.method, validationErrors: `role ${req.body.role} is not exist , please provide valid role`, Api :registrationProfileNode_serviceUrl+req.url ,status:412} });
        commonResObj(res,412,{validationErrors:{role:`role ${req.body.role}is not exist , please provide valid role`}})
    }

}





module.exports = ApiErrors;