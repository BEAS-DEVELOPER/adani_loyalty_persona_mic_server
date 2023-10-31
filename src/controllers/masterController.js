const commonResObj = require('../../middleWares/responses/commonResponse')

const { dcm_hierarchies, dcm_languages, cog_countries, cog_states, cog_cities, organization } = require('../../config/db.config')

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
    findAllOrganizations: {}
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
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.masterLanguages", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}

masterController.createHierarchies = async (req, res) => {
    try {
        const { name, org_id } = req.body;
        const date_create = new Date().toISOString();
        let hierObj = {
            name: name,
            enabled: 1,
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
        let all_hierarchies = await dcm_hierarchies.findAll();
        commonResObj(res, 200, { hierarchiesDetails: all_hierarchies });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.masterHierarchies", error: error, Api: masterServiceUrl + req.url, status: 500 } });
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
        let country = await cog_countries.create(countryObj);
        commonResObj(res, 200, { countryDetails: country });
    } catch (error) {
        logger.log({ level: "error", message: { file: "src/controllers/" + filename, method: "masterController.createCountries", error: error, Api: masterServiceUrl + req.url, status: 500 } });
        commonResObj(res, 500, { error: error })
    }
}
masterController.findAllCountries = async (req, res) => {
    try {
        let all_countries = await cog_countries.findAll();
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
        let countryDetails = await cog_countries.findOne({ where: { "id": stateObj.cog_countries_id } });
        if (countryDetails && countryDetails.has_states == 1) {
            let state = await cog_states.create(stateObj);
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
        let all_states = await cog_states.findAll();
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
        let countryDetails = await cog_countries.findOne({ where: { "id": cityObj.cog_countries_id } });
        let stateDetails = await cog_states.findOne({ where: { "id": cityObj.cog_states_id } });
        if (countryDetails && (countryDetails.has_states == 1 || countryDetails.has_cities == 1) && stateDetails && stateDetails.has_cities == 1) {
            let city = await cog_cities.create(cityObj);
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
        let all_cities = await cog_cities.findAll();
        commonResObj(res, 200, { citiesDetails: all_cities });
    } catch (error) {
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

module.exports = masterController