const joi = require('joi');
const fieldsValidation  =   require('../../middleWares/fieldsValidation');


const registerSchema={
   _tempRegSchema : {}
}

registerSchema._tempRegSchema =  async(req, res , next) =>{
   let fields =  await  fieldsValidation(req , res, "temporaryRegister")
   return joi.object(fields).validate(req.body, { abortEarly: false })
}


module.exports = registerSchema;