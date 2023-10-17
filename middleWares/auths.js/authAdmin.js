
const JwtService  =   require('../../services/JwtService');
const commonResObj = require('../responses/commonResponse')

module.exports= authenticatorAdmin = async(req , res  ,next)=>{
     let authHeader = req.headers.authorisation;
     let token , access;
     if(!authHeader){
      commonResObj(res, 401, { message: "Please provide token"})
     }else{
          token = authHeader.split(' ')[1]; 
          if(token != undefined && token != "undefined"){
            access = await JwtService.verify(token).accesstype
            if(access == "SuperAdmin" || access == "Admin"){
               try{
                  if( await JwtService.verify(token)){ next() }
               }catch(err){
                  commonResObj(res, 401, { message: "Sorry you are not authorised" })
               }
             }else{
               commonResObj(res, 401, { message: "Sorry you are not authorised" })
             }
          }else{
            commonResObj(res, 401, { message: "Please provide token" })
          }
         
          
    }

}

