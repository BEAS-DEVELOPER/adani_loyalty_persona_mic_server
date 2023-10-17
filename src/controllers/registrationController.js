const registrationModal = require('../models/dcm_registrationContactModel');
const commonResObj = require('../..//middleWares/responses/commonResponse')
const paramsMasterIds = require('../../config/dcm_paramsMasterIds')
const groupMembersIds = require('../../config/dcm_groupMemberIds')
// const JwtService = require('../../../services/JwtService')
// const refreshJwtService = require('../../../services/refreshJwtService')
// const bcrypt = require('bcryptjs');
const { basicProfile, tempContactRegistration, tempPhoneRegistration,tempEmailRegistration, parentChildMapping ,
        paramsValue ,companies , paramsMaster , dcm_groupMembersInfo } = require('../../config/db.config')

require("dotenv").config();
const logger = require('../../supports/logger')

var path = require('path');

// const { appendFile } = require('fs');
// const address = require('address');

var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var regServiceUrl = process.env.registrationProfileNode_serviceUrl;


const registrationController = {

  tempRegistration: {},
  basicProfileRegistration: {},
  addProfileRegistration: {}

}

registrationController.tempRegistration = async (req, res) => {
  try {

    let date_create = new Date().toISOString();
  //  const role = req.body.role;
   // let  = await tempContactRegistration.findOne({ where: { id: req.body.organization_Id } });

 //========================================> TO BE STORED IN dcm_contacts
    let tempRegContactsObj = {
      first_name: (req.body.first_name)?req.body.first_name:'',
      middle_name: (req.body.middle_name)?req.body.middle_name:'',
      last_name: (req.body.last_name)?req.body.last_name:'',
      gender: (req.body.gender)?req.body.gender:'',
      date_of_birth: (req.body.date_of_birth)?req.body.gender:'',
      created_at: date_create,
      dcm_organization_id : req.body.organization_Id
    };
    let responseObjContact = await tempContactRegistration.create(tempRegContactsObj);

    // ========================  TO BE STORED IN dcm_groupMembersInfo
    let groupMembrsObj={
      dcm_contacts_id : responseObjContact.id, 
      dcm_group_members_id : '',
      created_at: date_create,
      created_by: responseObjContact.id,
      value:req.body.identity_number,
      is_verified:'1',
      verified_by:responseObjContact.id
    }
    if(req.body.identity_number_type == 'aadharcard'){
      groupMembrsObj.dcm_group_members_id = groupMembersIds.dcm_groupMembers_aadhar_id
    }else if(req.body.identity_number_type == 'voterId'){
      groupMembrsObj.dcm_group_members_id = groupMembersIds.dcm_groupMembers_voterId_id
    }else if(req.body.identity_number_type == 'driving_license'){
      groupMembrsObj.dcm_group_members_id= groupMembersIds.dcm_groupMembers_drivinglicense_id
    }
    let groupMembrsObj_Res = await dcm_groupMembersInfo.create(groupMembrsObj);
    if(req.body.GSTN != ''){
      groupMembrsObj.dcm_group_members_id= groupMembersIds.dcm_groupMembers_GSTN_id
      groupMembrsObj.value= req.body.GSTN
      let groupMembrsObj_Res = await dcm_groupMembersInfo.create(groupMembrsObj);
    }
  // ===================================>  TO BE STORED IN PARAMS VALES WITH RESPECT OF PARAMS MASTER ID

  let pramsValuesObj={
      dcm_param_master_id:paramsMasterIds.Adani_AdaniLoyalty_gender_paramId,
      value:req.body.gender,
      dcm_contacts_id:responseObjContact.id,
      created_at:date_create,
      is_verified: '1' ,
      verified_by : responseObjContact.id
  }
  let pramsValuesObj_Res = await paramsValue.create(pramsValuesObj);

  // ======================================>  TO BE STORED IN dcm_company
  let companiesObj={
      name:(req.body.company_establishment_name)?req.body.company_establishment_name:'',
      is_active : '1' ,
      dcm_organization_id : req.body.organization_Id,
      dcm_company_groups_id:0,
      company_type : 3,
  }
  let companiesObj_Res = await companies.create(companiesObj);

  //=====================================>  TO BE STORED IN  dcm_phones
    let tempRegPhoneObj = { 
      number: (req.body.mobile_number)?req.body.mobile_number:'',
      created_at: date_create,
      dcm_contacts_id: responseObjContact.dataValues.id
    }
    let responseObjPhone   = await tempPhoneRegistration.create(tempRegPhoneObj);
  // =======================================>  TO BE STORED IN dcm_emails
    let tempRegEmailObj = { 
      email_address: (req.body.email_address)?req.body.email_address:'',
      created_at: date_create,
      dcm_contacts_id: responseObjContact.id
    }
    let responseObjEmail   = await tempEmailRegistration.create(tempRegEmailObj);
    commonResObj(res, 200, { regContactData: responseObjContact, regPhoneData: responseObjPhone, regEmailData: responseObjEmail });
  //  commonResObj(res, 200, {message : 'Temporary registration done successfully'});
  } catch (error) {
    console.log(error)
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController._tempRegistartion", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error })
  }
}


registrationController.basicProfileRegistration = async (req, res) => {
  try {
    let date_create = new Date().toISOString();
    const role = req.body.role;
    const contact_id = req.body.contact_id;
    let contactDetails = await tempContactRegistration.findOne({ where: { id: contact_id } })
    if (contactDetails) {

      let basicProfileObj = {
        dcm_contacts_id: contact_id,
        line1: req.body.Address,
        line2: req.body.PostOffice,
        line3: req.body.Landmark,
        city: req.body.City,
        post_code: req.body.PinCode,
        dcm_states_id: req.body.State,
        dcm_cities_id: req.body.District,
        created_at: date_create
      };

      if (role != "Contractor") {

      } else {
        let contractor_id = contact_id;
        let dealer_id = req.body.dealer_id;
        let dealerDetails = await tempContactRegistration.findOne({ where: { id: dealer_id } })
        let mappingDetails = await parentChildMapping.findOne({ where: { contractor_id: contractor_id } })
        if (dealerDetails) {
          if (!mappingDetails) {
            let mappingObj = {
              "dealer_id": dealer_id,
              "contractor_id": contractor_id,
              "is_active": 1,
              "created_at": date_create
            }
            await parentChildMapping.create(mappingObj)
            let responseObj = await basicProfile.create(basicProfileObj)
            commonResObj(res, 200, { basicProfileData: responseObj });
          }
          else {
            commonResObj(res, 200, { "message": "DCM dealer and contractors not added" });
          }
        }
      }
    } else {
      commonResObj(res, 200, { "message": "DCM Contact not found" });
    }
  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.basicProfileRegistration", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error })
  }
}

registrationController.addProfileRegistration = async (req, res) => {
  try {

  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.addProfileRegistration", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error })
  }
}


//==============   EXPORTING MODULE =================
module.exports = registrationController