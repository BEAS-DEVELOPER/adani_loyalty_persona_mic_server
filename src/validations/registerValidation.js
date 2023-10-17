
const ApiError = require('../../middleWares/errors/ApiError')
const registrationSchema = require('../schemas/registrationSchema');

require("dotenv").config( );


const registrationValidation={
   _tempRegist : {}
   
}

registrationValidation._tempRegist =  async(req,res,next) =>{
   if(ApiError.checkBody(req,res)){
      if(ApiError.checkUserHierarchy(req,res)){
         const value = await  registrationSchema._tempRegSchema(req, res , next)
         ApiError.checkError(value,req,res,next)
      }
   }
}


 
// ==================MODULE EXPORTING==============
module.exports = registrationValidation;

