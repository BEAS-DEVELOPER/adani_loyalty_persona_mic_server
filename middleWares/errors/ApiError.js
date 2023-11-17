const commonResObj = require('../responses/commonResponse')
const logger          = require('../../supports/logger')
const JwtService  =   require('../../services/JwtService');
const mandatoryFields  =   require('../fieldsValidation');
const hirarchyIds      =   require('../../config/dcm_hierarchyIds')

var path = require('path');
var filename = path.basename(__dirname)+"/"+path.basename(__filename);
var registrationProfileNode_serviceUrl = process.env.registrationProfileNode_serviceUrl; 

const  ApiErrors= {
    
    checkBody:{},
    checkError:{},
    checkUserAccessForTemReg:{},
   
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

ApiErrors.checkUserAccessForTemReg  = ( req , res )=>{
    if(req.body.createdby_hierarchies_id === ''){
        commonResObj(res,412,{validationErrors:{createdby_hierarchies_id:`please provide createdby_hierarchies_id`}})
    }else if(req.body.createdby_hierarchies_id  == 0 ){

        let isRoleExist = false;
        let canSelfReg = false
        let hierarchyName=''
        hirarchyIds.forEach(role=>{
            if((role.id == req.body.hierarchies_id) && (req.body.hierarchies_id != '') ){
                hierarchyName = role.name
                isRoleExist =true
                if(role.selfReg == true)
                {
                    canSelfReg = true
                }
            }
        })
        if(canSelfReg == true){
            return canSelfReg
        }else if((isRoleExist == true)  && (canSelfReg == false)){
            logger.log({ level: "info", message: { fileLocation: "Middlewares/"+filename+" ,ApiErrors.checkUserRole", method:req.method, validationErrors: `role ${req.body.role} is blocked , `, Api :registrationProfileNode_serviceUrl+req.url ,status:412} });
            commonResObj(res,412,{validationErrors:{hierarchies_id:`Self registration for ${hierarchyName} is blocked`}})
         }else{
            logger.log({ level: "info", message: { fileLocation: "Middlewares/"+filename+" ,ApiErrors.checkUserRole", method:req.method, validationErrors: `role ${req.body.role} is not exist , `, Api :registrationProfileNode_serviceUrl+req.url ,status:412} });
            commonResObj(res,412,{validationErrors:{hierarchies_id:`hierarchies_id  for${req.body.hierarchies_id} is not exist ,`}})
        }

    }else{

        let isAccessVerified = false;
        hirarchyIds.forEach(role=>{
            if((role.id == req.body.hierarchies_id) && (req.body.hierarchies_id != '') ){
                 role.canRegBy.forEach(obj=>{
                    if(obj.id == req.body.createdby_hierarchies_id){
                         isAccessVerified = true;
                    }
                })
            }
        })

        if(isAccessVerified){
            return isAccessVerified
        }else{
            let createdBy_hierarchy_name=''
            hirarchyIds.forEach(role=>{
                if((role.id == req.body.createdby_hierarchies_id) && (req.body.createdby_hierarchies_id != '') ){
                    createdBy_hierarchy_name = role.name
                }
            })
            commonResObj(res,412,{validationErrors:{createdby_hierarchies_id:`${createdBy_hierarchy_name} is disabled`}})
        }
    }
   
}







module.exports = ApiErrors;