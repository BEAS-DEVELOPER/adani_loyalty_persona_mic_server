const registrationModal = require('../models/dcm_registrationContactModel');
const commonResObj = require('../..//middleWares/responses/commonResponse')
const paramsMasterIds = require('../../config/dcm_paramsMasterIds')
const groupMembersIds = require('../../config/dcm_groupMemberIds')
// const JwtService = require('../../../services/JwtService')
// const refreshJwtService = require('../../../services/refreshJwtService')
// const bcrypt = require('bcryptjs');
const { basicProfile, tempContactRegistration, tempPhoneRegistration, tempEmailRegistration, parentChildMapping, organization, paramsMaster,
  paramsValue, companies, ambContactTagMap, userFile, dcm_groups, dcm_groupMembers, dcm_groupMembersInfo, dcm_hierarchies, dcm_salesData, ambPanDeclarationLog } = require('../../config/db.config')

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
  addProfileRegistration: {},
  saleRegistration: {}

}

async function paramsOperations(org_id, contact_id, master_name, params_value) {
  let orgDetails = await organization.findOne({ where: { "id": org_id } });
  let date_create = new Date().toISOString();
  let response = "";
  if (params_value.length > 0) {
    if (orgDetails) {
      let masterParamsDetails = await paramsMaster.findOne({ where: { "dcm_organization_id": org_id, "name": master_name } });
      let masterParam_id = masterParamsDetails.id;
      let valObj = {
        dcm_param_master_id: masterParam_id,
        value: params_value.toString(),
        dcm_contact_id: contact_id,
        created_at: date_create
      };
      let create_param_val = {};
      let paramsValueDetails = await paramsValue.findOne({ where: { "dcm_contacts_id": contact_id, "dcm_param_master_id": masterParam_id } });
      if (!paramsValueDetails) {
        create_param_val = await paramsValue.create(valObj);
      }
      response = create_param_val.value;
    }
  }
  return response;
}

async function  add_contractor_to_branch(parent_id, contractor_id) { //  parent_id = > created_by_id , contractor_id = > contact_id

}

registrationController.tempRegistration = async (req, res) => {
  try {
  

    let date_create = new Date().toISOString();

    //========================================> TO BE STORED IN dcm_contacts
    let tempRegContactsObj = {
      first_name: (req.body.first_name) ? req.body.first_name : '',
      middle_name: (req.body.middle_name) ? req.body.middle_name : '',
      last_name: (req.body.last_name) ? req.body.last_name : '',
      gender: (req.body.gender) ? req.body.gender : '',
      date_of_birth: (req.body.date_of_birth) ? req.body.gender : '',
      created_at: date_create,
      dcm_organization_id: req.body.organization_Id,
      dcm_hierarchies_id : req.body.hierarchies_id,
      createdby_hierarchies_id : req.body.createdby_hierarchies_id,
      created_by:req.body.created_by,
      id_extern01: req.body.mobile_number ,
      designation : 'Not Mentioned',
      is_verified:(req.body.is_verified == undefined)?'0':req.body.is_verified,
      verified_by: (req.body.verified_by == undefined)?'0':req.body.verified_by,
      dcm_languages_id :(req.body.dcm_languages_id == undefined)?'1':req.body.dcm_languages_id,
      can_redeem : (req.body.can_redeem == undefined)?'1':req.body.can_redeem,
      enrollment_date: date_create, // yyyy-mm-dd
      is_deleted: '0',
    };
    let responseObjContact = await tempContactRegistration.create(tempRegContactsObj);

    let branch_id = add_contractor_to_branch(req.body.created_by,responseObjContact.id)




    // ========================  TO BE STORED IN dcm_groupMembersInfo
    let groupMembrsObj = {
      dcm_contacts_id: responseObjContact.id,
      dcm_group_members_id: '',
      created_at: date_create,
      created_by: responseObjContact.id,
      value: req.body.identity_number,
      is_verified: '1',
      verified_by: responseObjContact.id
    }
    if (req.body.identity_number_type == 'aadharcard') {
      groupMembrsObj.dcm_group_members_id = groupMembersIds.dcm_groupMembers_aadhar_id
    } else if (req.body.identity_number_type == 'voterId') {
      groupMembrsObj.dcm_group_members_id = groupMembersIds.dcm_groupMembers_voterId_id
    } else if (req.body.identity_number_type == 'driving_license') {
      groupMembrsObj.dcm_group_members_id = groupMembersIds.dcm_groupMembers_drivinglicense_id
    }
    let groupMembrsObj_Res = await dcm_groupMembersInfo.create(groupMembrsObj);
    if (req.body.GSTN != '') {
      groupMembrsObj.dcm_group_members_id = groupMembersIds.dcm_groupMembers_GSTN_id
      groupMembrsObj.value = req.body.GSTN
      let groupMembrsObj_Res = await dcm_groupMembersInfo.create(groupMembrsObj);
    }
    // ===================================>  TO BE STORED IN PARAMS VALES WITH RESPECT OF PARAMS MASTER ID

    let pramsValuesObj = {
      dcm_param_master_id: paramsMasterIds.Adani_AdaniLoyalty_gender_paramId,
      value: req.body.gender,
      dcm_contacts_id: responseObjContact.id,
      created_at: date_create,
      is_verified: '1',
      verified_by: responseObjContact.id
    }
    let pramsValuesObj_Res = await paramsValue.create(pramsValuesObj);

    // ======================================>  TO BE STORED IN dcm_company
    let companiesObj = {
      name: (req.body.company_establishment_name) ? req.body.company_establishment_name : '',
      is_active: '1',
      dcm_organization_id: req.body.organization_Id,
      dcm_company_groups_id: 0,
      company_type: 3,
    }
    let companiesObj_Res = await companies.create(companiesObj);

    //=====================================>  TO BE STORED IN  dcm_phones
    let tempRegPhoneObj = {
      number: (req.body.mobile_number) ? req.body.mobile_number : '',
      created_at: date_create,
      dcm_contacts_id: responseObjContact.dataValues.id
    }
    let responseObjPhone = await tempPhoneRegistration.create(tempRegPhoneObj);
    // =======================================>  TO BE STORED IN dcm_emails
    let tempRegEmailObj = {
      email_address: (req.body.email_address) ? req.body.email_address : '',
      created_at: date_create,
      dcm_contacts_id: responseObjContact.id
    }
    let responseObjEmail = await tempEmailRegistration.create(tempRegEmailObj);
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
    const tso_id = req.body.tso_id ? req.body.tso_id : '';
    const org_id = req.body.org_id ? req.body.org_id : null;
    const hierarchies_id = req.body.hierarchies_id ? req.body.hierarchies_id : null;
    const contact_id = req.body.contact_id ? req.body.contact_id : null;
    const valueName = req.body.active_sites ? req.body.active_sites : '';
    const company_id = req.body.company_id ? req.body.company_id : null
    const group_members_id = req.body.dcm_group_members_id ? req.body.dcm_group_members_id : null
    const recipient = req.body.recipient ? req.body.recipient : '';
    const is_default = req.body.is_default ? req.body.is_default : '0';
    const country = req.body.country_id ? req.body.country_id : null;
    const address = req.body.address ? req.body.address : '';
    const post_office = req.body.post_office ? req.body.post_office : '';
    const landmark = req.body.landmark ? req.body.landmark : '';
    const city = req.body.city ? req.body.city : '';
    const pin_code = req.body.pin_code ? req.body.pin_code : '';
    const state = req.body.state_id ? req.body.state_id : null;
    const district = req.body.district_id ? req.body.district_id : null;
    const address_change_type = req.body.address_change_type ? req.body.address_change_type : '0';
    const address_status = req.body.address_status ? req.body.address_status : '0';
    const is_active = req.body.is_active ? req.body.is_active : '1';
    const edit_lock = req.body.edit_lock ? req.body.edit_lock : '0';
    const taluka = req.body.taluka_id ? req.body.taluka_id : null;
    let contactDetails = await tempContactRegistration.findOne({ where: { id: contact_id } });
    if (contactDetails) {
      let basicProfileObj = {
        dcm_contacts_id: contact_id,
        recipient: recipient,
        is_default: is_default,
        line1: address,
        line2: post_office,
        line3: landmark,
        city: city,
        dcm_group_members_id: group_members_id,
        post_code: pin_code,
        dcm_states_id: state,
        dcm_cities_id: district,
        dcm_countries_id: country,
        address_change_type: address_change_type,
        address_status: address_status,
        is_active: is_active,
        created_at: date_create,
        dcm_organization_id: org_id,
        dcm_companies_id: company_id,
        is_verified: '0',
        edit_lock: edit_lock,
        dcm_taluka_id: taluka
      };
      let profileObj = {}
      let basicDetails = await basicProfile.findOne({ where: { "dcm_contacts_id": contact_id } });
      if (!basicDetails) {
        profileObj = await basicProfile.create(basicProfileObj);
      } else {
        profileObj = basicDetails;
      }
      let dealerDetails = await tempContactRegistration.findOne({ where: { id: contact_id } });
      if (dealerDetails) {
        let no_activeSites = await paramsOperations(org_id, contact_id, "Active Sites", valueName);
        let contractDetails = await ambContactTagMap.findOne({ where: { "dcm_contact_id": contact_id } });
        let tagsId = contractDetails.amb_tags_id;
        let mappingOfficer = "";
        let responseObj = {};
        let hierarchyDetails = await dcm_hierarchies.findOne({ where: { "id": hierarchies_id, "dcm_organization_id": org_id } });
        if (hierarchyDetails.name == "Dealer") {
          mappingOfficer = tso_id;
          responseObj = {
            "mappingOfficer": mappingOfficer,
            "contractorCategory": tagsId,
            "noOfActiveSites": no_activeSites,
            "addressLine1": profileObj.line1,
            "postOffice": profileObj.line2,
            "landmark": profileObj.line3,
            "city": profileObj.city,
            "state": profileObj.dcm_states_id,
            "district": profileObj.dcm_cities_id,
            "pinCode": profileObj.post_code
          };
        } else if (hierarchyDetails.name == "TSO") {
          let dealerArr = [];
          let mappingDetails = await parentChildMapping.findAll({ where: { "contractor_id": contact_id } });
          if (mappingDetails.length > 0) {
            let no_activeSites = await paramsOperations(org_id, contact_id, "Active Sites", valueName);
            let contractDetails = await ambContactTagMap.findOne({ where: { "dcm_contact_id": contact_id } });
            let tagsId = contractDetails.amb_tags_id;
            for (let i = 0; i < mappingDetails.length; i++) {
              dealerArr.push(mappingDetails[i].dealer_id)
            }
            responseObj = {
              "chooseDealer": dealerArr,
              "contractorCategory": tagsId,
              "noOfActiveSites": no_activeSites,
              "addressLine1": profileObj.line1,
              "postOffice": profileObj.line2,
              "landmark": profileObj.line3,
              "city": profileObj.city,
              "state": profileObj.dcm_states_id,
              "district": profileObj.dcm_cities_id,
              "pinCode": profileObj.post_code
            }
          }
        } else {

        }
        commonResObj(res, 200, { basicProfileDetails: responseObj });
      } else {
        commonResObj(res, 200, { "message": "DCM dealers and contractors not added" });
      }
    } else {
      commonResObj(res, 200, { "message": "DCM Contacts not found" });
    }
  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.basicProfileRegistration", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error })
  }
}

registrationController.addProfileRegistration = async (req, res) => {
  try {
    const org_id = req.body.org_id ? req.body.org_id : null;
    const contact_id = req.body.contact_id ? req.body.contact_id : null;
    const value_pan = req.body.pan ? req.body.pan : '';
    const value_m_status = req.body.marital_status ? req.body.marital_status : '';
    const value_sp_name = req.body.spouse_name ? req.body.spouse_name : '';
    const is_verified = req.body.is_verified ? req.body.is_verified : '0'
    let date_create = new Date().toISOString();
    const value_sp_brthday = req.body.spouse_birthday ? req.body.spouse_birthday : '';
    const value_m_anniv = req.body.marraige_anniversary ? req.body.marraige_anniversary : '';
    let grpDetails = await dcm_groups.findOne({ where: { "name": "identityDocumentType" } });
    let grpId = grpDetails.id;
    let grpMemberDetails = await dcm_groupMembers.findOne({ where: { "master_groups_id": grpId, "name": "PAN" } });
    let grpMemberId = grpMemberDetails.id;
    let infoObj = {
      dcm_contacts_id: contact_id,
      value: value_pan,
      dcm_group_members_id: grpMemberId,
      created_at: date_create,
      is_verified: '1',
      created_by: contact_id,
      is_verified: is_verified
    }
    let pan = "";
    let grpInfoDetails = await dcm_groupMembersInfo.findOne({ where: { "dcm_contacts_id": contact_id, "dcm_group_members_id": grpMemberId } })
    if (!grpInfoDetails) {
      let panDetails = await dcm_groupMembersInfo.create(infoObj);
      pan = panDetails.value;
    } else {
      pan = grpInfoDetails.value;
    }
    let m_status = await paramsOperations(org_id, contact_id, "Marital Status", value_m_status);
    let sp_name = "";
    let sp_brthday = "";
    let m_anniv = "";
    if (m_status == "Married") {
      sp_name = await paramsOperations(org_id, contact_id, "Spouse Name", value_sp_name);
      sp_brthday = await paramsOperations(org_id, contact_id, "Spouse Birthday", value_sp_brthday);
      m_anniv = await paramsOperations(org_id, contact_id, "Wedding Anniversary", value_m_anniv);
    }
    let responseObj = {
      "panNumber": pan,
      "panImage": "",
      "maritalStatus": m_status,
      "spouseName": sp_name,
      "spouseBirthday": sp_brthday,
      "marraigeAnniversary": m_anniv,
      "voterDlAadharFrontImage": "",
      "voterDlAadharBackImage": ""
    }
    let panDeclarationObj = {
      dcm_contact_id: contact_id,
      dcm_order_id: 0,
      declaration_type: "O",
      declare_no_pan: "0",
      created_at: date_create
    }
    if (responseObj.panNumber == '') {
      panDeclarationObj.declare_no_pan = '0'
      await ambPanDeclarationLog.create(panDeclarationObj)
    } else {
      panDeclarationObj.declare_no_pan = '1'
      await ambPanDeclarationLog.create(panDeclarationObj)
    }
    let fileObject = {
      dcm_contacts_id: contact_id,
      file_type: "",
      file_size: 0,
      file_path: "",
      created_at: date_create,
      is_active: '1',
      group_name: "",
      sub_group_name: "",
      custom1: "",
      custom2: ""
    }
    if (req.files) {
      if (req.files.pan_image) {
        let pan = req.files.pan_image[0].filename;
        let panPath = regServiceUrl + "/images/pan/" + pan;
        responseObj["panImage"] = panPath;
        fileObject.file_type = req.files.pan_image[0].mimetype;
        fileObject.file_size = req.files.pan_image[0].size / (1024 * 1024);
        fileObject.created_at = date_create;
        fileObject.file_path = panPath;
        fileObject.group_name = "identityDocumentType"
        fileObject.sub_group_name = "PAN"
        fileObject.custom1 = grpId
        fileObject.custom2 = grpMemberId
        userFile.create(fileObject);
      }
      let grpAadharDetails = await dcm_groupMembers.findOne({ where: { "master_groups_id": grpId, "name": "aadhar" } });
      let grpAadharId = grpAadharDetails.id;
      if (req.files.front_image) {
        let frontImg = req.files.front_image[0].filename;
        let frontImgPath = regServiceUrl + "/images/aadhar/DL/voter/front/" + frontImg;
        responseObj["voterDlAadharFrontImage"] = frontImgPath;
        fileObject.file_type = req.files.front_image[0].mimetype;
        fileObject.file_size = req.files.front_image[0].size / (1024 * 1024);
        fileObject.created_at = date_create;
        fileObject.file_path = frontImgPath;
        fileObject.group_name = "identityDocumentType"
        fileObject.sub_group_name = "aadharFront"
        fileObject.custom1 = grpId
        fileObject.custom2 = grpAadharId
        userFile.create(fileObject);
      }
      if (req.files.back_image) {
        let backImg = req.files.back_image[0].filename;
        let backImgPath = regServiceUrl + "/images/aadhar/DL/voter/back/" + backImg;
        responseObj["voterDlAadharBackImage"] = backImgPath;
        fileObject.file_type = req.files.back_image[0].mimetype;
        fileObject.file_size = req.files.back_image[0].size / (1024 * 1024);
        fileObject.created_at = date_create;
        fileObject.file_path = backImgPath;
        fileObject.group_name = "identityDocumentType"
        fileObject.sub_group_name = "aadharBack"
        fileObject.custom1 = grpId
        fileObject.custom2 = grpAadharId
        userFile.create(fileObject);
      }
    }
    commonResObj(res, 200, { additionalProfileDetails: responseObj });
  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.addProfileRegistration", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error });
  }
}

registrationController.saleRegistration = async (req, res) => {
  try {
    const { claimed_by, hierarchies_id, org_id } = req.body;
    let date_create = new Date().toISOString();
    let responseObj = {
      dcm_contacts_id: "",
      area_filter: "",//to be discussed
      product_purchased_from: "",
      dcm_product_master_id: "",
      claimed_quantity: "",
      sale_date: ""
    };
    let hierarchyDetails = await dcm_hierarchies.findOne({ where: { "id": hierarchies_id, "dcm_organization_id": org_id } });
    if (hierarchyDetails.name == "Contractor") {
      let saleUserDetails = await dcm_salesData.findOne({ where: { "dcm_contacts_id": claimed_by } });
      let contactDetails = await tempContactRegistration.findOne({ where: { "id": claimed_by } });
      let finalSaleResp = {}
      if (!saleUserDetails) {
        let saleUserObj = {
          id_extern01: contactDetails.id_extern01,
          dcm_contacts_id: contactDetails.id,
          dcm_product_master_id: 11,
          tonnage_sold: 12.23,
          claimed_quantity: 3,
          invoice_id: 1,
          sale_date: "18-10-2023 13:33:23",
          created_by_contact_id: contactDetails.created_by,
          product_purchased_from: 1,
          created_at: date_create,
          is_deleted: "0",
          mode: 'mobileapp'
        }
        finalSaleResp = await dcm_salesData.create(saleUserObj)
      } else {
        finalSaleResp = saleUserDetails
      }
      responseObj.dcm_contacts_id = finalSaleResp.dcm_contacts_id;
      responseObj.product_purchased_from = finalSaleResp.product_purchased_from;
      responseObj.dcm_product_master_id = finalSaleResp.dcm_product_master_id;
      responseObj.claimed_quantity = finalSaleResp.claimed_quantity;
      responseObj.sale_date = finalSaleResp.sale_date;
      commonResObj(res, 200, { saleRegistrationDetails: responseObj });
    } else {
      commonResObj(res, 200, { "message": "Please select only contractors" });
    }
  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.tempRegistration", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error });
  }
}

//==============   EXPORTING MODULE =================
module.exports = registrationController