
const jwt     =    require('jsonwebtoken');
require("dotenv").config( );
const SECRET_TOKEN = process.env.SECRET_TOKEN;

class JwtService{

    static sign( payload , expiry ='90000s' ,secret = SECRET_TOKEN  ){
      return jwt.sign(payload , secret , {expiresIn : expiry});
    }

    static verify( token  ,secret = SECRET_TOKEN  ){
       return jwt.verify(token , secret);
    }

}

module.exports = JwtService;