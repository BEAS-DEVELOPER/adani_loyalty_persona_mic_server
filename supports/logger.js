const  { 
    createLogger ,
    transports,
    format,
} = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level:'info',
      file:'fileName',
      format:format.combine(format.timestamp(),format.json()),
    }),
    new transports.File({
        filename :'logs/error.log',
        level:'info',
        maxsize : 5242880,// 5mb,
        maxFiles : 5,
        colorize:false
    })
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//


module.exports = logger;