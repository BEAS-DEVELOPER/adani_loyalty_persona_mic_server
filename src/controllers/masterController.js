const commonResObj = require('../../middleWares/responses/commonResponse')
const dbConn = require('../../config/db.config')
const { dcm_hierarchies, dcm_languages, countries, states, cities, organization, ambTags } = require('../../config/db.config')

const logger = require('../../supports/logger')

var path = require('path');

var filename = path.basename(__dirname) + "/" + path.basename(__filename);
var masterServiceUrl = process.env.masterNode_serviceUrl;

const masterController = {
    createLanguages: {},
    findAllLanguages: {},
    createHierarchies: {},
    findAllHierarchies: {},
    createCountries: {},
    findAllCountries: {},
    createStates: {},
    findAllStates: {},
    createCities: {},
    findAllCities: {},
    createOrganizations: {},
    findAllOrganizations: {},
    findAllBranches: {},
    findAllTSOs: {},
    findAllDealers: {},
    findAllTSOBranches: {}
}

async function getAllDealersTags(contact_id) {
    let [allDealers, data] = await dbConn.sequelize.query("SELECT dealer_id FROM dcm_contact_parent_child_mapping WHERE contractor_id =?", { replacements: [contact_id] });
    let branches = [];
    if (allDealers.length > 0) {
        for (let i = 0; i < allDealers.length; i++) {
            let [branch, brdata] = await dbConn.sequelize.query("SELECT amb_tags.id FROM amb_contact_tag_mapping JOIN amb_tags on amb_tags.id=amb_contact_tag_mapping.amb_tags_id WHERE amb_tags.is_active = '1' AND amb_tags.amb_tag_groups_id = 1 AND amb_contact_tag_mapping.is_active = '1' AND amb_contact_tag_mapping.dcm_contact_id = ?", { replacements: [allDealers[i].dealer_id] })
            if (branch.length > 0) {
                branches.push(branch[0]);
            }
        }
    }
    if (branches.length > 0) {
        return branches.filter((obj, index) => { return index === branches.findIndex(o => obj.name === o.name); });
    }
    return [];
}

async function getAllTagIds(stateId, cityId) {
    let [allContactIds, data] = await dbConn.sequelize.query('SELECT dcm_zone_contact_mapping.dcm_contact_id FROM dcm_zone_contact_mapping JOIN dcm_zone_location_mapping ON dcm_zone_location_mapping.id=dcm_zone_contact_mapping.dcm_zone_location_mapping_id WHERE dcm_zone_location_mapping.dcm_state_id =? AND dcm_zone_location_mapping.dcm_district_id =?', { replacements: [stateId, cityId] });
    let allTagIds = [];
    if (allContactIds.length > 0) {
        for (let i = 0; i < allContactIds.length; i++) {
            let contact_id = allContactIds[i].dcm_contact_id;
            let [contactTagIds, cdata] = await dbConn.sequelize.query('SELECT amb_contact_tag_mapping.amb_tags_id FROM amb_contact_tag_mapping WHERE dcm_contact_id =?', { replacements: [contact_id] });
            if (contactTagIds.length > 0) {
                for (let j = 0; j < contactTagIds.length; j++) {
                    let id = contactTagIds[j].amb_tags_id;
                    allTagIds.push(id);
                }
            }
        }
    }
    if (allTagIds.length > 0) {
        return allTagIds.filter(function (v, i, self) {
            return i == self.indexOf(v);
        });
    }
    return [];
}

masterController.createLanguages = async (req, res) => {
    try {
        const { name, description, comment, language_code } = req.body;
        const date_create = new Date().toISOString();
        let langObj = {
            name: name,
            description: description,
            comment: comment,
            language_code: language_code,
            created_at: date_create
        };
        let language = await dcm_languages.create(langObj);
        commonResObj(res, 200, { languageDetails: language });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createLanguages", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllLanguages = async (req, res) => {
    try {
        let all_languages = await dcm_languages.findAll();
        commonResObj(res, 200, { languageDetails: all_languages });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllLanguages", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.createHierarchies = async (req, res) => {
    try {
        const { name, org_id, enabled } = req.body;
        const date_create = new Date().toISOString();
        let hierObj = {
            name: name,
            enabled: enabled,
            root_id: 0,
            lft: 0,
            rgt: 0,
            level: 0,
            tree_parent: 0,
            dcm_organization_id: org_id,
            created_at: date_create,
            status: 1,
            has_dms_login: 1
        };
        let hierarchy = await dcm_hierarchies.create(hierObj);
        commonResObj(res, 200, { hierarchiesDetails: hierarchy });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createHierarchies", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllHierarchies = async (req, res) => {
    try {
        let org_id = req.params.org_id;
        let all_hierarchies = await dcm_hierarchies.findAll({ where: { "dcm_organization_id": org_id, "enabled": 1 } });
        commonResObj(res, 200, { hierarchiesDetails: all_hierarchies });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllHierarchies", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.createCountries = async (req, res) => {
    try {
        const { name, has_states, has_cities, currency_name, currency_code, dialing_code, iso2_code } = req.body;
        const date_create = new Date().toISOString();
        let countryObj = {
            name: name,
            has_states: has_states,
            has_cities: has_cities,
            currency_name: currency_name,
            currency_code: currency_code,
            dialing_code: dialing_code,
            iso2_code: iso2_code,
            created_at: date_create
        }
        let country = await countries.create(countryObj);
        commonResObj(res, 200, { countryDetails: country });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createCountries", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}
masterController.findAllCountries = async (req, res) => {
    try {
        let all_countries = await countries.findAll();
        commonResObj(res, 200, { countriesDetails: all_countries });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllCountries", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}
masterController.createStates = async (req, res) => {
    try {
        const { name, has_cities, cog_countries_id, iso_code } = req.body;
        const date_create = new Date().toISOString();
        let stateObj = {
            name: name,
            has_cities: has_cities,
            cog_countries_id: cog_countries_id,
            iso_code: iso_code,
            is_active: "1",
            created_at: date_create
        }
        let countryDetails = await countries.findOne({ where: { "id": stateObj.cog_countries_id } });
        if (countryDetails && countryDetails.has_states == 1) {
            let state = await states.create(stateObj);
            commonResObj(res, 200, { stateDetails: state });
        } else {
            commonResObj(res, 200, { cityDetails: "State not added. Please enter correct country id" });
        }
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createStates", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}
masterController.findAllStates = async (req, res) => {
    try {
        let all_states = await states.findAll();
        commonResObj(res, 200, { statesDetails: all_states });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllStates", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}
masterController.createCities = async (req, res) => {
    try {
        const { name, cog_countries_id, cog_states_id } = req.body;
        const date_create = new Date().toISOString();
        let cityObj = {
            name: name,
            cog_countries_id: cog_countries_id,
            cog_states_id: cog_states_id,
            created_at: date_create,
            is_active: "1"
        };
        let countryDetails = await countries.findOne({ where: { "id": cityObj.cog_countries_id } });
        let stateDetails = await states.findOne({ where: { "id": cityObj.cog_states_id } });
        if (countryDetails && (countryDetails.has_states == 1 || countryDetails.has_cities == 1) && stateDetails && stateDetails.has_cities == 1) {
            let city = await cities.create(cityObj);
            commonResObj(res, 200, { cityDetails: city });
        } else {
            commonResObj(res, 200, { cityDetails: "City not added.. Please enter correct country or state id" });
        }
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createCities", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}
masterController.findAllCities = async (req, res) => {
    try {
        let all_cities = await cities.findAll();
        commonResObj(res, 200, { citiesDetails: all_cities });
    } catch (error) {
        console.log(error)
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllCities", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.createOrganizations = async (req, res) => {
    try {
        const { name, description } = req.body;
        let orgObj = {
            name: name,
            description: description,
            is_active: "1"
        }
        let org = await organization.create(orgObj);
        commonResObj(res, 200, { organizationDetails: org });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createOrganizations", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllOrganizations = async (req, res) => {
    try {
        let all_organization = await organization.findAll();
        commonResObj(res, 200, { organizationDetails: all_organization });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllOrganizations", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllBranches = async (req, res) => {
    try {
        const state_id = req.params.state_id;
        const city_id = req.params.city_id;
        let tag_ids = await getAllTagIds(state_id, city_id);
        let allBranches = [];
        if (tag_ids.length > 0) {
            for (let i = 0; i < tag_ids.length; i++) {
                let tag_id = tag_ids[i];
                let branchDetails = await ambTags.findOne({ where: { "id": tag_id, "amb_tag_groups_id": 1 } });
                let branchObj = {
                    id: branchDetails.id,
                    name: branchDetails.name
                }
                allBranches.push(branchObj);
            }
        }
        commonResObj(res, 200, { branchDetails: allBranches });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllBranches", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllTSOBranches = async (req, res) => {
    try {
        const tag_id = req.params.branch_id;
        let [TSODetails, data] = await dbConn.sequelize.query('SELECT dcm_contacts.* FROM dcm_contacts JOIN amb_contact_tag_mapping ON dcm_contacts.id = amb_contact_tag_mapping.dcm_contact_id WHERE dcm_contacts.dcm_hierarchies_id = 2 AND amb_contact_tag_mapping.amb_tags_id =?', { replacements: [tag_id] });
        let allTSOs = [];
        if (TSODetails.length > 0) {
            for (let i = 0; i < TSODetails.length; i++) {
                let obj = TSODetails[i];
                let fname = obj.first_name ? obj.first_name : '';
                let lname = obj.last_name ? obj.last_name : '';
                let mname = obj.middle_name ? obj.middle_name : '';
                let name1 = (fname + " " + mname).trim();
                let full_name = (name1 + " " + lname).trim();
                let id = obj.id;
                let org_id = obj.dcm_organization_id;
                let hier_id = obj.dcm_hierarchies_id;
                let sf_id = obj.sf_guard_user_id;
                let TSOobj = {
                    id: id,
                    org_id: org_id,
                    hier_id: hier_id,
                    sf_guard_id: sf_id,
                    full_name: ''
                }
                if (full_name.length > 0) {
                    TSOobj.full_name = full_name;
                }
                allTSOs.push(TSOobj);
            }
        }
        commonResObj(res, 200, { TSODetails: allTSOs });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllTSOs", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllDealers = async (req, res) => {
    try {
        const contact_id = req.params.contact_id;
        let allDealerBranches = await getAllDealersTags(contact_id);
        let dealerDetails = [];
        if (allDealerBranches.length > 0) {
            for (let i = 0; i < allDealerBranches.length; i++) {
                [dealerDetails, data] = await dbConn.sequelize.query('SELECT dcm_contacts.* FROM dcm_contacts JOIN amb_contact_tag_mapping ON dcm_contacts.id = amb_contact_tag_mapping.dcm_contact_id WHERE dcm_contacts.dcm_hierarchies_id = 3 AND amb_contact_tag_mapping.amb_tags_id =?', { replacements: [allDealerBranches[i].id] });
            }
        }
        let allDealers = [];
        if (dealerDetails.length > 0) {
            for (let i = 0; i < dealerDetails.length; i++) {
                let obj = dealerDetails[i];
                let fname = obj.first_name ? obj.first_name : '';
                let lname = obj.last_name ? obj.last_name : '';
                let mname = obj.middle_name ? obj.middle_name : '';
                let name1 = (fname + " " + mname).trim();
                let full_name = (name1 + " " + lname).trim();
                let id = obj.id;
                let org_id = obj.dcm_organization_id;
                let hier_id = obj.dcm_hierarchies_id;
                let sf_id = obj.sf_guard_user_id;
                let dealerObj = {
                    id: id,
                    org_id: org_id,
                    hier_id: hier_id,
                    sf_guard_id: sf_id,
                    full_name: ''
                }
                if (full_name.length > 0) {
                    dealerObj.full_name = full_name;
                }
                allDealers.push(dealerObj);
            }
        }
        commonResObj(res, 200, { dealerDetails: allDealers });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllTSOs", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.findAllTSOs = async (req, res) => {
    try {
        const contact_id = req.params.contact_id;
        let allTSOBranches = await getAllDealersTags(contact_id);
        let TSODetails = [];
        if (allTSOBranches.length > 0) {
            for (let i = 0; i < allTSOBranches.length; i++) {
                [TSODetails, data] = await dbConn.sequelize.query('SELECT dcm_contacts.* FROM dcm_contacts JOIN amb_contact_tag_mapping ON dcm_contacts.id = amb_contact_tag_mapping.dcm_contact_id WHERE dcm_contacts.dcm_hierarchies_id = 2 AND amb_contact_tag_mapping.amb_tags_id =?', { replacements: [allTSOBranches[i].id] });
            }
        }
        let allTSOs = [];
        if (TSODetails.length > 0) {
            for (let i = 0; i < TSODetails.length; i++) {
                let obj = TSODetails[i];
                let fname = obj.first_name ? obj.first_name : '';
                let lname = obj.last_name ? obj.last_name : '';
                let mname = obj.middle_name ? obj.middle_name : '';
                let name1 = (fname + " " + mname).trim();
                let full_name = (name1 + " " + lname).trim();
                let id = obj.id;
                let org_id = obj.dcm_organization_id;
                let hier_id = obj.dcm_hierarchies_id;
                let sf_id = obj.sf_guard_user_id;
                let TSOobj = {
                    id: id,
                    org_id: org_id,
                    hier_id: hier_id,
                    sf_guard_id: sf_id,
                    full_name: ''
                }
                if (full_name.length > 0) {
                    TSOobj.full_name = full_name;
                }
                allTSOs.push(TSOobj);
            }
        }
        commonResObj(res, 200, { TSODetails: allTSOs });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.findAllTSOs", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

module.exports = masterController