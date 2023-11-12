
const joi = require('joi');
const commonResObj = require('../middleWares/responses/commonResponse')
const hirarchyIds      =   require('../config/dcm_hierarchyIds')


const FildsValidation=(req , res , apiFor)=>{

    let fields={};
    switch(apiFor){
        case "temporaryRegister": // API FOR => getting from url (which api is calling)
                    let roleName = ''
                    hirarchyIds.forEach(role=>{
                        if(role.id == req.body.hierarchies_id){
                            roleName =  role.name
                        }
                    })
                    
                    switch(roleName){
                        case "Dealer": //================================= FOR USER ROLE DEALER
                                fields = {
                                    full_name     : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F",'O'),
                                    hierarchies_id : joi.number().required(),
                                    createdby_hierarchies_id : joi.number().allow(0),
                                    created_by      : joi.number().allow(0),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.number().required(),
                                    sap_code:joi.string().allow(null),
                                    is_approved:joi.number().allow(null),
                                    approved_by:joi.number().allow(null),
                                    approved_at:joi.date().allow(null),
                                    dcm_languages_id:joi.number().allow(null),
                                    can_redeem:joi.number().allow(null),

                                }
                        break;
                        case "Retailer":  //=================================  FOR USER ROLE RETAILER
                                fields = {
                                    full_name     : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F","O"),
                                    hierarchies_id : joi.number().required(),
                                    createdby_hierarchies_id : joi.number().required(),
                                    created_by      : joi.number().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.number().required(),
                                    sap_code:joi.string().allow(null),
                                    is_approved:joi.number().allow(null),
                                    approved_by:joi.number().allow(null),
                                    approved_at:joi.date().allow(null),
                                    dcm_languages_id:joi.number().allow(null),
                                    can_redeem:joi.number().allow(null),
                                   


                                }
                        break;
                        case "Sales Force": //================================= FOR USER ROLE SALES FORCE
                                fields = {
                                    full_name     : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F" ,"O"),
                                    hierarchies_id : joi.number().required(),
                                    createdby_hierarchies_id : joi.number().required(),
                                    created_by      : joi.number().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.number().required(),
                                    sap_code:joi.string().allow(null),
                                    is_approved:joi.number().allow(null),
                                    approved_by:joi.number().allow(null),
                                    approved_at:joi.date().allow(null),
                                    dcm_languages_id:joi.number().allow(null),
                                    can_redeem:joi.number().allow(null),


                                }
                        break;
                        case "Contractor": //================================= FOR USER ROLE CONTRACTOR
                                fields = {
                                    full_name     : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F",'O'),
                                    hierarchies_id : joi.number().required(),
                                    createdby_hierarchies_id : joi.number().allow(0),
                                    created_by      : joi.number().allow(0),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.number().required(),
                                    sap_code:joi.string().allow(null),
                                    is_approved:joi.number().allow(null),
                                    approved_by:joi.number().allow(null),
                                    approved_at:joi.date().allow(null),
                                    dcm_languages_id:joi.number().allow(null),
                                    can_redeem:joi.number().allow(null),
                                }
                        break;
                        case "Engineer": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                    full_name     : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F","O"),
                                    hierarchies_id : joi.number().required(),
                                    createdby_hierarchies_id : joi.number().required(),
                                    created_by      : joi.number().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.number().required(),
                                    sap_code:joi.string().allow(null),
                                    is_approved:joi.number().allow(null),
                                    approved_by:joi.number().allow(null),
                                    approved_at:joi.date().allow(null),
                                    dcm_languages_id:joi.number().allow(null),
                                    can_redeem:joi.number().allow(null),
                                }
                        break; 
                        case "Architect": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                    full_name     : joi.string().max(50).required(),
                                    mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                    date_of_birth  : joi.date().required(),
                                    email_address  : joi.string().allow(null),
                                    gender         : joi.string().valid("M","F","O"),
                                    hierarchies_id : joi.number().required(),
                                    createdby_hierarchies_id : joi.number().required(),
                                    created_by      : joi.number().required(),
                                    identity_number : joi.string().required(),
                                    identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                    marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                    company_establishment_name : joi.string().required(),
                                    GSTN   : joi.string().required(),
                                    organization_Id: joi.number().required(),
                                    sap_code:joi.string().allow(null),
                                    is_approved:joi.number().allow(null),
                                    approved_by:joi.number().allow(null),
                                    approved_at:joi.date().allow(null),
                                    dcm_languages_id:joi.number().allow(null),
                                    can_redeem:joi.number().allow(null),
                                }
                        break;  
                        case "Designers": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                        full_name     : joi.string().max(50).required(),
                                        mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                        date_of_birth  : joi.date().required(),
                                        email_address  : joi.string().allow(null),
                                        gender         : joi.string().valid("M","F","O"),
                                        hierarchies_id : joi.number().required(),
                                        createdby_hierarchies_id : joi.number().required(),
                                        created_by      : joi.number().required(),
                                        identity_number : joi.string().required(),
                                        identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                        marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                        company_establishment_name : joi.string().required(),
                                        GSTN   : joi.string().required(),
                                        organization_Id: joi.number().required(),
                                        sap_code:joi.string().allow(null),
                                        is_approved:joi.number().allow(null),
                                        approved_by:joi.number().allow(null),
                                        approved_at:joi.date().allow(null),
                                        dcm_languages_id:joi.number().allow(null),
                                        can_redeem:joi.number().allow(null),
                                }
                        break;
                        case "Interior": //================================= FOR USER ROLE ENGINEER
                                fields = {
                                        full_name     : joi.string().max(50).required(),
                                        mobile_number  : joi.number().integer().min(1000000000).message("invalid mobile number").max(9999999999).message("invalid mobile number").required(),
                                        date_of_birth  : joi.date().required(),
                                        email_address  : joi.string().allow(null),
                                        gender         : joi.string().valid("M","F","O"),
                                        hierarchies_id : joi.number().required(),
                                        createdby_hierarchies_id : joi.number().required(),
                                        created_by      : joi.number().required(),
                                        identity_number : joi.string().required(),
                                        identity_number_type  : joi.string().valid('aadharcard','voterId','driving_license').required(),
                                        marital_status : joi.string().valid('Married','Single').required(), /// will applied on addition aprfile
                                        company_establishment_name : joi.string().required(),
                                        GSTN   : joi.string().required(),
                                        organization_Id: joi.number().required(),
                                        sap_code:joi.string().allow(null),
                                        is_approved:joi.number().allow(null),
                                        approved_by:joi.number().allow(null),
                                        approved_at:joi.date().allow(null),
                                        dcm_languages_id:joi.number().allow(null),
                                        can_redeem:joi.number().allow(null),
                                }
                        break;  
                                     
                    }
                    

        break;
        
        case "_assignUsersTsoSchema":
            fields = {
                TSO_contactId  : joi.number().required(),
                userContactId  : joi.number().required(),
            }

        break;

        case "_getListOfTSOByBranchSchema":
            fields = {
                loginUserHirarchy  : joi.number().required(),
                loginUserContactId  : joi.number().required(),
            }
        break;

        case "_getUserProfile":
            fields = {
                loginUserContactId  : joi.number().required(),
            }
        break;



        
       

    }

    return fields;      
};



module.exports=FildsValidation;




