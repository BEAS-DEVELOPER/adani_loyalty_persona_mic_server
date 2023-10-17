const responseCode = require("../../config/statusCodeConfig");
const response = (res, statusCode, data) => {
    //@ts-ignore
    statusCode=(statusCode==undefined|| statusCode=="")?400:statusCode;
    let results=responseCode(statusCode);
    res.status(statusCode)
                .jsonp({
                    success: results.result,
                    message: results.message,
                    response: data
                }).end();
};

module.exports = response;