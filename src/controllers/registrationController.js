const registrationModal = require('../models/dcm_registrationContactModel');
const commonResObj = require('../../middleWares/responses/commonResponse')
const paramsMasterIds = require('../../config/dcm_paramsMasterIds')
const groupMembersIds = require('../../config/dcm_groupMemberIds')
////////////_____________

var md5 = require('js-md5');

const dbConn = require('../../config/db.config')
const bcrypt = require('bcryptjs');
const hyrarchiesIds = require('../../config/dcm_hierarchyIds')

// const JwtService = require('../../../services/JwtService')
// const refreshJwtService = require('../../../services/refreshJwtService')
const cryptoJS = require('crypto')

const { basicProfile, tempContactRegistration, tempPhoneRegistration, tempEmailRegistration,
  parentChildMapping, organization, paramsMaster, paramsValue, companies, ambContactTagMap, userFile,
  dcm_groups, dcm_groupMembers, dcm_groupMembersInfo, dcm_hierarchies, dcm_salesData, ambPanDeclarationLog,
  sf_guard_user, dcm_contactCompanies

} = require('../../config/db.config')

const passport = require('passport');
require('../../passport-config');

require("dotenv").config();
const logger = require('../../supports/logger')
const moment = require('moment');
var path = require('path');

// const { appendFile } = require('fs');
// const address = require('address');

var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var regServiceUrl = process.env.registrationProfileNode_serviceUrl;


const registrationController = {
  tempRegistration: {},
  basicProfileRegistration: {},
  addProfileRegistration: {},
  saleRegistration: {},
  login: {}

}

async function branchesContactsParent(dealer_id) {
  let mapDealerObj = {
    dealer_id: dealer_id,
    contractor_id: contact_id,
    is_active: "1"
  };
  let parentChildMap = await parentChildMapping.create(mapDealerObj);
  let branch = await dbConn.sequelize.query("SELECT DISTINCT amb_tags.name FROM amb_contact_tag_mapping JOIN amb_tags on amb_tags.id=amb_contact_tag_mapping.amb_tags_id WHERE amb_contact_tag_mapping.dcm_contact_id = ", parentChildMap.dealer_id, " AND amb_tags.is_active = '1' AND amb_contact_tag_mapping.is_active = '1'");
  return branch;
}

async function create_zone_contact_mapping(zone_name,contact_id){
  let zonemap=await dbConn.sequelize.query("SELECT * FROM dcm_zone_location_mapping JOIN dcm_zones ON dcm_zones.id=dcm_zone_location_mapping.dcm_zone_id WHERE dcm_zones.zone_name= ",zone_name);
  let date_create=new Date().toISOString();
  if(zonemap.length>0) {
    for(let i=0;i<zonemap.length;i++) {
      let zoneObj={
        dcm_zone_location_mapping_id:zonemap[i].id,
        dcm_zone_id:zonemap[i].dcm_zone_id,
        dcm_contact_id:contact_id,
        created_at:date_create
      }
      let chk=await dbConn.sequelize.query("SELECT * FROM dcm_zone_contact_mapping WHERE dcm_zone_location_mapping_id= ",zoneObj.dcm_zone_location_mapping_id," AND dcm_zone_id= ",zoneObj.dcm_zone_id," AND dcm_contact_id= ",zoneObj.dcm_contact_id);
      if(chk.length<=0) {
        await dcm_zoneContactMap.create(zoneObj);
      } else {
        let date_update=new Date().toISOString();
        await dcm_zoneContactMap.update({"updated_at":date_update},{where:{
          dcm_zone_location_mapping_id:zonemap[i].id,
          dcm_zone_id:zonemap[i].dcm_zone_id,
          dcm_contact_id:contact_id,
          created_at:date_create
        }})
      }
    }
  }
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

function matchingHirarachiesIddWith(hyrarchiesId, hirarchyName) {
  console.log("hyrarchiesIdhyrarchiesId", hyrarchiesId)
  console.log("hirarchyName", hirarchyName)
  let isSame = false
  hyrarchiesIds.forEach(obj => {
    if (obj.name == hirarchyName && obj.id == hyrarchiesId) {
      isSame = true
    }
  })
  return isSame
}

function getHirarchyIdsOf(hirarchyIdsOf) {
  hyrarchiesIds.forEach(obj => {
    if (obj.name == hirarchyIdsOf) {
      return obj.id
    }
  })
}


function generatePasswordString() {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789 ' + '!@#_';
  for (let i = 1; i <= 8; i++) {
    let char = Math.floor(Math.random()
      * str.length + 1);
    pass += str.charAt(char)
  }
  console.log("_______________PASSWORD : ", pass)
  return pass;
}


async function add_contractor_to_branch(parent_id, contractor_id) { //  parent_id = > created_by_id , contractor_id = > contact_id
  const [data, result] = await dbConn.sequelize.query("SELECT * FROM amb_contact_tag_mapping CROSS JOIN amb_tags ON amb_tags.id = amb_contact_tag_mapping.amb_tags_id WHERE  amb_contact_tag_mapping.dcm_contact_id = ?", { replacements: [parent_id], })
  console.log("datadata", data)
  let array_push = []
  if (data.length > 0) {
    data.forEach(obj => {
      array_push.push({
        'dcm_contact_id': contractor_id,
        'amb_tags_id': obj.amb_tags_id,
        'is_active': 1
      })
    })
    if (array_push.length > 0) {
      const bulkCreated = await ambContactTagMap.bulkCreate(array_push);
      console.log("__________________bulkCreated", bulkCreated)
    }
  }
  return array_push;
}

function generateEmailVefificationCode(email){
   return  crypto.createHash('md5').update(email).digest("hex")
}

registrationController.tempRegistration = async (req, res) => {
  try {

    // CHECKING MOBILE NUMBER AND EMAAIL ADDRESS 
    let isEmailExist = await tempEmailRegistration.findOne({ where: { email_address: req.body.email_address } });
    let isContactExist = await tempPhoneRegistration.findOne({ where: { number: req.body.mobile_number } });

    let emailContactErrObj = {};
    let errEmailConatct = false

    if (isEmailExist != null) {
      emailContactErrObj.email_address = "Email already taken, please try with another email"; errEmailConatct = true
    }
    if (isContactExist != null) {
      emailContactErrObj.mobile_number = "Mobile number already taken, please try with another mobile number"; errEmailConatct = true
    }
    if (errEmailConatct == true) {
      commonResObj(res, 409, { error: emailContactErrObj })
    }
    else {

      // MOBILE NUMBER AND EMAIL ID IS CHECKED , NOT IN DB  , CAN BE PROCEED FOR FURTHER PROCESS

      let date_create = new Date().toISOString();
      let islogin = true
      let namesArrary = req.body.full_name

      //========================================> TO BE STORED IN dcm_contacts
      let tempRegContactsObj = {

        first_name: req.body.full_name.split(' ')[0],
        middle_name: req.body.full_name.split(' ').length > 3 ? req.body.full_name.split(' ')[1] : '',
        last_name: req.body.full_name.split(' ').length > 3 ? req.body.full_name.split(' ')[2] : req.body.full_name.split(' ')[1],
        gender: (req.body.gender) ? req.body.gender : '',
        date_of_birth: (req.body.date_of_birth) ? moment(req.body.date_of_birth).format('YYYY-MM-DD') : '',
        created_at: date_create,
        dcm_organization_id: req.body.organization_Id,
        dcm_hierarchies_id: req.body.hierarchies_id,
        created_by: req.body.created_by,
        id_extern01: req.body.mobile_number,
        designation: 'Not Mentioned',
        is_approved: (req.body.is_verified == null) ? '0' : req.body.is_verified,
        approved_by: (req.body.verified_by == null) ? '0' : req.body.verified_by,
        approved_at: (req.body.verified_by == null) ? '0' : req.body.verified_at,
        dcm_languages_id: (req.body.dcm_languages_id == null) ? '1' : req.body.dcm_languages_id,
        can_redeem: (req.body.can_redeem == null) ? 1 : req.body.can_redeem,
        enrollment_date: moment(date_create).format('YYYY-MM-DD'), // yyyy-mm-dd
        is_deleted: '0',

      };

      //=============================>   MATCHING COMING HIRARCHYIES ID IN PAYLOAD WITH SYSEM HYRARCHIRES ID

      if (islogin && matchingHirarachiesIddWith(req.body.dcm_hierarchies_id, 'TSO')) {
        // $modified_datacontact['created_by'] = $register_by_contact_id;
        tempRegContactsObj.created_by = req.body.created_by
        // $modified_datacontact['is_approved'] = '1';
        tempRegContactsObj.is_approved = '1'
        // $modified_datacontact['approved_at'] = date('Y-m-d H:i:s');
        tempRegContactsObj.approved_at = moment(date_create).format('YYYY-MM-DD HH:MM:SS')
        // $modified_datacontact['can_redeem'] = '0';
        tempRegContactsObj.can_redeem = '0'
        // $modified_datacontact['approved_by'] = $register_by_contact_id;
        tempRegContactsObj.approved_by = req.body.created_by

      } else if (islogin && matchingHirarachiesIddWith(req.body.dcm_hierarchies_id, 'Dealer')) {
        // $modified_datacontact['created_by'] = $register_by_contact_id;
        tempRegContactsObj.created_by = req.body.created_by
        // $modified_datacontact['is_approved'] = '0';
        tempRegContactsObj.is_approved = '0'
        // $modified_datacontact['approved_at'] = date('Y-m-d H:i:s');
        tempRegContactsObj.approved_at = moment(date_create).format('YYYY-MM-DD HH:MM:SS')
        // $modified_datacontact['can_redeem'] = '0';
        tempRegContactsObj.can_redeem = '0'
        // $modified_datacontact['approved_by'] = $this->input->post('tso_id');
        // tempRegContactsObj.approved_by = getHirarchyIdsOf('TSO') ################################   WILL UPDATED LATER ON BY DEEP
      } else {
        // $modified_datacontact['is_approved'] = '0';
        tempRegContactsObj.is_approved = '0'
      }

      let responseObjContact = await tempContactRegistration.create(tempRegContactsObj);
      if (responseObjContact.id) { // contact_id
        await tempContactRegistration.update({ id_extern01: 'AMB_' + responseObjContact.id }, {
          where: {
            id: responseObjContact.id,
          },
        });
      }

      let branch_id = await add_contractor_to_branch(req.body.created_by, responseObjContact.id) // responseObjContact.id => dcm_contact_id
      console.log("___________________branch_id", branch_id)

      // ========================>  TO BE STORED IN sf_guard_user
      let hashPassword = await bcrypt.hash(generatePasswordString(), 10)  // _________________TO STORE PASSWORD
      let user_array = { // CREATING PASSWORD OBJ
        'username': 'AMB_' + responseObjContact.id,
        'password': hashPassword,
        'dcm_organization_id': responseObjContact.dcm_organization_id,
        'is_active': 1,
        'created_at': moment(date_create).format("YYYY-MM-DD HH:MM:SS"),
        'dcm_contacts_id': responseObjContact.id,
        'dcm_hierarchies_id': responseObjContact.dcm_hierarchies_id,
        'force_pass_chaged': '1'
      }
      let inserTedPassword = await sf_guard_user.create(user_array);
      console.log("insertedPassword", inserTedPassword)



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

      // let pramsValuesObj = {
      //   dcm_param_master_id: paramsMasterIds.Adani_AdaniLoyalty_gender_paramId,
      //   value: req.body.gender, // => contact table 
      //   dcm_contacts_id: responseObjContact.id,
      //   created_at: date_create,
      //   is_verified: '1',
      //   verified_by: responseObjContact.id
      // }
      // let pramsValuesObj_Res = await paramsValue.create(pramsValuesObj);
      // ======================================>  TO BE STORED IN dcm_company


      let companiesObj = {
        name: (req.body.company_establishment_name) ? req.body.company_establishment_name : '',
        is_active: '1',
        dcm_organization_id: req.body.organization_Id,
        dcm_company_groups_id: groupMembersIds.dcm_company_groups_id,
        company_type: groupMembersIds.company_type
      }
      let companiesObj_Ress1 = await companies.create(companiesObj);


      // ======================================>  TO BE STORED IN dcm_contacts_compnies
      let Obj = {
        designation: "Not mentioned",
        dcm_companies_id: companiesObj_Ress1.id,
        dcm_contacts_id: responseObjContact.id
      }
      let ompaniesObj_Ress1 = await dcm_contactCompanies.create(Obj)

      //=====================================>  TO BE STORED IN  dcm_phones
    //const [data,result] = await dbConn.sequelize.query("SELECT * FROM amb_contact_tag_mapping CROSS JOIN amb_tags ON amb_tags.id = amb_contact_tag_mapping.amb_tags_id WHERE  amb_contact_tag_mapping.dcm_contact_id = ?", { replacements: [parent_id], })
    
    //query("select gm.id as id from dcm_group_members gm join dcm_groups g on (gm.master_groups_id = g.id) where g.name = 'Phone Type' and LOWER(gm.name) = '" . strtolower($as_group_mem) . "'")->row()->id;
    
    let dcmgrpId  = await dbConn.sequelize.query("select gm.id as id from dcm_group_members gm join dcm_groups g on (gm.master_groups_id = g.id) where g. name = 'Phone Type' and LOWER(gm.name) = 'mobile'" )
    console.log("dcmgrpIddcmgrpIddcmgrpId" , dcmgrpId)
      let tempRegPhoneObj = {
        number: (req.body.mobile_number) ? req.body.mobile_number : '',
        created_at: date_create,
        dcm_contacts_id: responseObjContact.dataValues.id,
        country_code:'+91',
        is_verified:'1',
        dcm_organization_id:req.body.organization_Id,
        is_default : '1',
        dcm_group_member_id:dcmgrpId//===========================>???


      }
      let responseObjPhone = await tempPhoneRegistration.create(tempRegPhoneObj);

      // =======================================>  TO BE STORED IN dcm_emails
      let tempRegEmailObj = {
        email_address: (req.body.email_address) ? req.body.email_address : '',
        created_at: date_create,
        dcm_contacts_id: responseObjContact.id,
        dcm_organization_id:req.body.organization_Id,
        verification_code:generateEmailVefificationCode(req.body.email_address)

      }
      let responseObjEmail = await tempEmailRegistration.create(tempRegEmailObj);
      // commonResObj(res, 200, { regContactData: responseObjContact, regPhoneData: responseObjPhone, regEmailData: responseObjEmail });
      commonResObj(res, 200, { message: 'Temporary registration done successfully' });

    }
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
    const recipient = req.body.recipient ? req.body.recipient : '';
    const dealer_arr = req.body.dealer_arr ? req.body.dealer_arr : [];
    // const is_default = req.body.is_default ? req.body.is_default : '0';
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
    let dcm_group_members = await dcm_groupMembers.findOne({ where: { "name": "Home Address" } })
    const group_members_id = dcm_group_members.id;
    let contactDetails = await tempContactRegistration.findOne({ where: { id: contact_id } });
    if (contactDetails) {
      let basicProfileObj = {
        dcm_contacts_id: contact_id,
        recipient: recipient,
        is_default: "1",
        line1: address,
        line2: post_office,
        line3: landmark,
        city: city,
        dcm_group_members_id: group_members_id,
        post_code: pin_code,
        dcm_states_id: state,
        dcm_cities_id: district,
        dcm_countries_id: country,
        created_at: date_create,
        dcm_organization_id: org_id,
        is_verified: '0',
        dcm_taluka_id: taluka
      };
      let profileObj = {}
      let basicDetails = await basicProfile.findOne({ where: { "dcm_contacts_id": contact_id } });
      if (!basicDetails) {
        profileObj = await basicProfile.create(basicProfileObj);
      } else {
        profileObj = basicDetails;
      }
      let no_activeSites = await paramsOperations(org_id, contact_id, "Active Sites", valueName);
      let contractDetails = await ambContactTagMap.findOne({ where: { "dcm_contact_id": contact_id } });
      let tagsId = contractDetails.amb_tags_id;
      let mappingOfficer = "";
      let responseObj = {};
      let hierarchyDealerDetails = await dcm_hierarchies.findOne({ where: { "name": "Dealer", "dcm_organization_id": org_id } });
      let hierarchyTSODetails = await dcm_hierarchies.findOne({ where: { "name": "TSO", "dcm_organization_id": org_id } });
      if (hierarchyDealerDetails.id == contactDetails.dcm_hierarchies_id) {
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
        let contactObj = {
          approved_by: tso_id
        };
        await tempContactRegistration.update(contactObj, { where: { "id": contact_id } })
        await branchesContactsParent(contactDetails.createdBy);
      } else if (hierarchyTSODetails.id == contactDetails.dcm_hierarchies_id) {
        let no_activeSites = await paramsOperations(org_id, contact_id, "Active Sites", valueName);
        let branches = [];
        for(let i=0;i<dealer_arr.length;i++) {
          await branchesContactsParent(dealer_arr[i]);
        }//
        responseObj = {
          "chooseDealer": dealer_arr,
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
        await create_zone_contact_mapping();
      } else {
      }
      commonResObj(res, 200, { basicProfileDetails: responseObj });
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
      is_verified: '0',
      created_by: contact_id
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
      dcm_order_id: null,
      declaration_type: "E",
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
    let hierarchies_id = req.body.hierarchies_id ? req.body.hierarchies_id : null;
    let org_id = req.body.org_id ? req.body.org_id : null;
    let id_extern_01 = req.body.id_extern_01 ? req.body.id_extern_01 : '';
    let sale_contact_id = req.body.sale_contact_id ? req.body.sale_contact_id : null;
    let product_master_id = req.body.product_master_id ? req.body.product_master_id : null;
    let approve_qty = req.body.approve_qty ? req.body.approve_qty : null;
    let sold = req.body.sold ? req.body.sold : null;
    let date = req.body.date ? req.body.date : null;
    let product_purchased_from = req.body.product_purchased_from ? req.body.product_purchased_from : null;
    let created_by_contact_id = req.body.created_by_contact_id ? req.body.created_by_contact_id : null;
    let is_verified = req.body.is_verified ? req.body.is_verified : null;
    let mode = req.body.mode ? req.body.mode : null;
    let verified_by = req.body.verified_by ? req.body.verified_by : null;
    let category_id = req.body.category_id ? req.body.category_id : null;
    let date_create = new Date().toISOString();
    let responseObj = {
      dcm_contacts_id: "",
      area_filter: "",
      product_purchased_from: "",
      dcm_product_master_id: "",
      claimed_quantity: "",
      sale_date: ""
    };
    let contractHierarchyDetails = await dcm_hierarchies.findOne({ where: { "id": hierarchies_id, "dcm_organization_id": org_id } });
    let TSOHierarchyDetails = await dcm_hierarchies.findOne({ where: { "id": created_by_contact_id, "dcm_organization_id": org_id } });
    if (contractHierarchyDetails.name == "Contractor" && TSOHierarchyDetails.name == "TSO") {
      let saleUserDetails = await dcm_salesData.findOne({ where: { "dcm_contacts_id": sale_contact_id } });
      let finalSaleResp = {}
      if (!saleUserDetails) {
        let saleUserObj = {
          'id_extern01': id_extern_01,
          'dcm_contacts_id': sale_contact_id,
          'dcm_product_master_id': product_master_id,
          'tonnage_sold': (approve_qty < 0) ? sold : approve_qty,
          'claimed_quantity': sold,
          'sale_date': date,
          'product_purchased_from': product_purchased_from,
          'created_by_contact_id': created_by_contact_id,
          'created_at': date_create,
          'is_deleted': '0',
          'is_verified': is_verified,
          "verified_at": null,
          'mode': mode,
          'verified_by': verified_by,
          'category_id': category_id
        }
        if (is_verified != '0') {
          let date_verified = new Date().toISOString();
          saleUserObj.verified_at = date_verified;
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
      commonResObj(res, 200, { "message": "Please select only contractors and TSO" });
    }
  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.tempRegistration", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error });
  }
}

registrationController.login = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, async function (err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        commonResObj(res, 401, { message: info, })
      } else {
        const payload = {
          id: user.id,
          username: user.username,
          is_active: user.is_active,
          dcm_hierarchies_id: user.dcm_hierarchies_id,
          dcm_organization_id: user.dcm_organization_id,
          dcm_contacts_id: user.dcm_contacts_id
        }
        const options = {
          subject: `${user.id}`
        }
        const token = jwt.sign(payload, `${process.env.jwt_secret}`, options);
        commonResObj(res, 200, { message: 'Login Successful', userData: payload, access_token: token })
      }
    })(req, res, next);
  } catch (error) {
    logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "registrationController.loginUser", error: error, Api: regServiceUrl + req.url, status: 500 } });
    commonResObj(res, 500, { error: error });
  }
}

//==============   EXPORTING MODULE =================
module.exports = registrationController