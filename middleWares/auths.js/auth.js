
const JwtService  =   require('../../services/JwtService');
const commonResObj = require('../responses/commonResponse')

module.exports= authenticator = async(req , res ,next)=>{
     let authHeader = req.headers.authorisation;
     let token;
     if(!authHeader){
      commonResObj(res, 401, { message: 'Not authorised'})
     }else{
          token = authHeader.split(' ')[1]; 
          try{
             if( await JwtService.verify(token)){ next() }
          }catch(err){
             commonResObj(res, 403, { message: 'Not authorised' })
          }
    }

}

