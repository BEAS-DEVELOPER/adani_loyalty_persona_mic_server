const joi = require('joi');
const fieldsValidation  =   require('../../middleWares/fieldsValidation');


const registerSchema={
   _tempRegSchema : {},
   _getListOfTSOByBranchSchema:{},
   _assignUsersTsoSchema:{},
   _getUserProfile:{}
}
registerSchema._getUserProfile =  async(req, res , next) =>{
   let fields =  await  fieldsValidation(req , res, "_getUserProfile")
   return joi.object(fields).validate(req.body, { abortEarly: false })
}

registerSchema._getListOfTSOByBranchSchema =  async(req, res , next) =>{
   let fields =  await  fieldsValidation(req , res, "_getListOfTSOByBranchSchema")
   return joi.object(fields).validate(req.body, { abortEarly: false })
}
registerSchema._assignUsersTsoSchema =  async(req, res , next) =>{
   let fields =  await  fieldsValidation(req , res, "_assignUsersTsoSchema")
   return joi.object(fields).validate(req.body, { abortEarly: false })
}

registerSchema._tempRegSchema =  async(req, res , next) =>{
   let fields =  await  fieldsValidation(req , res, "temporaryRegister")
   return joi.object(fields).validate(req.body, { abortEarly: false })
}


module.exports = registerSchema;