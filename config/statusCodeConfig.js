
const statusCodes=(code)=>{
     let value={};
         switch(code){
             case 200:
                 value=  {result:true,message:"Success"};
             break;
             case 201:
                 value=  {result:true,message:"Success"};
             break;
             case 204:
              value=  {result:true,message:"No content"};
             break;
             case 400:
              value=  {result:false,message:"Bad request"};
             break;
             case 401:
              value=  {result:false,message:"Invalid credential"};
             break;
             case 403:
              value=  {result:false,message:"Session out"};
             break;
             case 404:
               value=  {result:false,message:" Not found "};
             break;
             case 409:
              value=  {result:false,message:"Duplicate entry"};
             break;
             case 412:
              value=  {result:false,message:"Validation failed"};
             break;
             case 500:
               value=  {result:false,message:"Internal server error "};
             break;
             default:
         // code block
         }
         return value;
     };
module.exports=statusCodes;

