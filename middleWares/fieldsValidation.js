
const joi = require('joi');
const commonResObj = require('../middleWares/responses/commonResponse')

const FildsValidation=(role, apiFor , res)=>{
    let fields={};
    switch(apiFor){
        case "temporaryRegister": // API FOR => getting from url (which api is calling)
                    switch(role){
                        case "Dealer": //================================= FOR USER ROLE DEALER
                                fields = {
                                    first_name     : joi.string().max(50).required(),
                                    middle_name    : joi.string().max(50).allow(''),
                                    last_name      : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F"),
                                    role           : joi.string().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.string().required()
                                }
                        break;
                        case "Retailer":  //=================================  FOR USER ROLE CONTRACTOR
                                fields = {
                                    first_name     : joi.string().max(50).required(),
                                    middle_name    : joi.string().max(50).allow(''),
                                    last_name      : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F"),
                                    role           : joi.string().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.string().required()
                                }
                        break;
                        case "Influencer": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                    first_name     : joi.string().max(50).required(),
                                    middle_name    : joi.string().max(50).allow(''),
                                    last_name      : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F"),
                                    role           : joi.string().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.string().required()
                                }
                        break;
                        case "Sales Force": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                    first_name     : joi.string().max(50).required(),
                                    middle_name    : joi.string().max(50).allow(''),
                                    last_name      : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F"),
                                    role           : joi.string().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.string().required()
                                }
                        break;
                        case "Contractor": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                    first_name     : joi.string().max(50).required(),
                                    middle_name    : joi.string().max(50).allow(''),
                                    last_name      : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F"),
                                    role           : joi.string().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.string().required()
                                }
                        break;
                        case "Engineer": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                    first_name     : joi.string().max(50).required(),
                                    middle_name    : joi.string().max(50).allow(''),
                                    last_name      : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F"),
                                    role           : joi.string().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.string().required()
                                }
                        break;              
                    }


        break;
        case "login":
        break;

        case "update":
        break;
       

    }

    return fields;      
};



module.exports=FildsValidation;




