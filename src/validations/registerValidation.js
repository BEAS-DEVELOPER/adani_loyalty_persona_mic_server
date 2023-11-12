
const ApiError = require('../../middleWares/errors/ApiError')
const registrationSchema = require('../schemas/registrationSchema');


require("dotenv").config( );


const registrationValidation={
   _tempRegist : {},
   _getListOfTSOByBranch:{},
   _assignUsersTso:{},
   _getUserProfile:{}

   
}
registrationValidation._getUserProfile =  async(req,res,next) =>{
      if(ApiError.checkBody(req,res)){
            const value = await  registrationSchema._getUserProfile(req, res , next)
            ApiError.checkError(value ,req,res,next)
      }
}
registrationValidation._getListOfTSOByBranch =  async(req,res,next) =>{
      if(ApiError.checkBody(req,res)){
            const value = await  registrationSchema._getListOfTSOByBranchSchema(req, res , next)
            ApiError.checkError(value ,req,res,next)
      }
}

registrationValidation._assignUsersTso =  async(req,res,next) =>{
      if(ApiError.checkBody(req,res)){
            const value = await  registrationSchema._assignUsersTsoSchema(req, res , next)
            ApiError.checkError(value ,req,res,next)
      }
}

registrationValidation._tempRegist =  async(req,res,next) =>{
  
      if(ApiError.checkBody(req,res)){
            if(ApiError.checkUserAccessForTemReg(req, res)){
               const value = await  registrationSchema._tempRegSchema(req, res , next)
               ApiError.checkError(value,req,res,next)
            }
      } 
}


 
// ==================MODULE EXPORTING==============
module.exports = registrationValidation;

