
const jwt     =    require('jsonwebtoken');
require("dotenv").config( );
const SECRET_TOKEN_REFRESH = process.env.SECRET_TOKEN_REFRESH;

class refreshJwtService{

    static sign( payload , expiry ='90000s' ,secret = SECRET_TOKEN_REFRESH  ){
      return jwt.sign(payload , secret , {expiresIn : expiry});
    }

    static verify( token  ,secret = SECRET_TOKEN_REFRESH  ){
       return jwt.verify(token , secret);
    }

}

module.exports = refreshJwtService;