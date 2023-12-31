
// const mysql = require('mysql');

// const dbConn = mysql.createConnection({
//     host     : process.env.DB_HOST,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.MYSQL_DB,
// });

// dbConn.connect(function(error ){
//     if(error){
//          console.log(" DB NOT CONNECTED");
//          throw error;
//     }else{
//         console.log(" DB CONNECTED SUCCESSFULLY ");
//     }
// })


/*
const {createPool} = require('mysql');
const dbConn = createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.MYSQL_DB,
    port     : process.env.MYSQL_PORT,
    limit    : 10,
});*/

// module.exports= dbConn;



const { Sequelize, DataTypes } = require('sequelize');
const datab = require('./credentials.json');

const sequelize = new Sequelize(
    datab.DB,
    datab.USER,
    datab.PASSWORD,
    {
        port: datab.PORT,
        host: datab.HOST,
        dialect: datab.dialect,
        logging: false
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
let db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.organization = require('../src/models/dcm_organizationModel')(sequelize, DataTypes)
db.dcm_hierarchies = require('../src/models/dcm_hierarchiesModel')(sequelize, DataTypes)
db.dcm_languages = require('../src/models/dcm_languages')(sequelize, DataTypes)
db.tempContactRegistration = require('../src/models/dcm_registrationContactModel')(sequelize, DataTypes)
db.tempPhoneRegistration = require('../src/models/registrationPhoneModel')(sequelize, DataTypes)
db.tempEmailRegistration = require('../src/models/dcm_registrationEmailModel')(sequelize, DataTypes)
db.basicProfile = require('../src/models/dcm_basicProfileModel')(sequelize, DataTypes)
db.parentChildMapping = require('../src/models/dcm_contactParentChildMapping')(sequelize, DataTypes)
db.paramsGroup = require('../src/models/dcm_paramsGroupModel')(sequelize, DataTypes)
db.paramsMaster = require('../src/models/dcm_paramsMasterModel')(sequelize, DataTypes)
db.paramsValue = require('../src/models/dcm_paramsValueModel')(sequelize, DataTypes)
db.masterContract = require('../src/models/ambujaMasterContractModel')(sequelize, DataTypes)
db.mappingContract = require('../src/models/ambujaContractMapModel')(sequelize, DataTypes)
db.userFile = require('../src/models/dcm_userFileModel')(sequelize, DataTypes)
db.companies = require('../src/models/dcm_companiesModel')(sequelize, DataTypes)
db.ambTagGrps = require('../src/models/ambTagGroupsModel')(sequelize, DataTypes)
db.ambTags = require('../src/models/ambTagsModel')(sequelize, DataTypes)
db.ambContactTagMap = require('../src/models/ambContactTagMapModel')(sequelize, DataTypes)
db.dcm_groups = require('../src/models/dcm_groupsModel')(sequelize, DataTypes)
db.dcm_groupMembers = require('../src/models/dcm_groupMembersModel')(sequelize, DataTypes)
db.dcm_groupMembersInfo = require('../src/models/dcm_groupMembersInfoModel')(sequelize, DataTypes)
db.dcm_salesData = require('../src/models/dcm_salesDataModel')(sequelize, DataTypes)
db.ambPanDeclarationLog = require('../src/models/ambPanDeclarationLog')(sequelize, DataTypes)
db.sf_guard_user = require('../src/models/sfGuardModel')(sequelize, DataTypes)
db.dcm_contactCompanies = require('../src/models/dcm_contactCompaniesModel')(sequelize, DataTypes)
db.dcm_zones = require('../src/models/dcm_zones')(sequelize, DataTypes)
db.dcm_zoneLocationMap = require('../src/models/dcm_zoneLocationMap')(sequelize, DataTypes)
db.dcm_zoneContactMap = require('../src/models/dcm_zoneContactMap')(sequelize, DataTypes)
db.countries = require('../src/models/cog_countries')(sequelize, DataTypes)
db.states = require('../src/models/cog_states')(sequelize, DataTypes)
db.cities = require('../src/models/cog_cities')(sequelize, DataTypes)
db.dcm_OneTimePass = require('../src/models/dcm_oneTimePasswordModel')(sequelize, DataTypes)


db.dcm_hierarchies.hasMany(db.organization, { foreignKey: "id" })
db.tempContactRegistration.hasOne(db.basicProfile, { foreignKey: "dcm_contacts_id" })
db.tempContactRegistration.hasMany(db.dcm_hierarchies, { foreignKey: "id" })
db.basicProfile.hasMany(db.organization, { foreignKey: "id" })
db.basicProfile.hasMany(db.companies, { foreignKey: "id" })
db.parentChildMapping.hasMany(db.tempContactRegistration, { foreignKey: "id" })
db.paramsGroup.hasMany(db.organization, { foreignKey: "id" })
db.paramsMaster.hasMany(db.paramsGroup, { foreignKey: "id" })
db.paramsMaster.hasMany(db.paramsGroup, { foreignKey: "dcm_organization_id" })
db.paramsValue.hasMany(db.paramsMaster, { foreignKey: "id" })
db.paramsValue.hasMany(db.tempContactRegistration, { foreignKey: "id" })
db.ambTags.hasMany(db.ambTagGrps, { foreignKey: "id" })
db.ambContactTagMap.hasMany(db.ambTags, { foreignKey: "id" })
db.ambContactTagMap.hasOne(db.tempContactRegistration, { foreignKey: "id" })
db.dcm_groupMembers.hasMany(db.dcm_groups, { foreignKey: "id" })
db.dcm_groupMembersInfo.hasMany(db.dcm_groupMembers, { foreignKey: "id" })
db.dcm_groupMembersInfo.hasOne(db.tempContactRegistration, { foreignKey: "id" })
db.dcm_salesData.hasOne(db.tempContactRegistration, { foreignKey: "id" })
db.sf_guard_user.hasMany(db.dcm_hierarchies, { foreignKey: "id" })
db.sf_guard_user.hasMany(db.organization, { foreignKey: "id" })
db.sf_guard_user.hasOne(db.tempContactRegistration, { foreignKey: "id" })
// db.tempContactRegistration.hasMany(db.sf_guard_user, { foreignKey: "id" })
db.tempContactRegistration.hasMany(db.organization, { foreignKey: "id" })
db.tempContactRegistration.hasMany(db.dcm_languages, { foreignKey: "id" })
// db.tempContactRegistration.hasOne(db.dcm_salesData, { foreignKey: "id_extern01" })
db.states.hasMany(db.countries, { foreignKey: "id" })
db.cities.hasMany(db.countries, { foreignKey: "id" })
db.cities.hasMany(db.states, { foreignKey: "id" })
db.dcm_zones.hasMany(db.organization, { foreignKey: "id" })
db.dcm_zoneLocationMap.hasMany(db.dcm_zones, { foreignKey: "id" })
db.dcm_zoneLocationMap.hasMany(db.countries, { foreignKey: "id" })
db.dcm_zoneLocationMap.hasMany(db.states, { foreignKey: "id" })
db.dcm_zoneLocationMap.hasMany(db.cities, { foreignKey: "id" })
db.dcm_zoneContactMap.hasMany(db.dcm_zoneLocationMap, { foreignKey: "id" })
db.dcm_zoneContactMap.hasMany(db.dcm_zones, { foreignKey: "id" })
db.dcm_zoneContactMap.hasMany(db.tempContactRegistration, { foreignKey: "id" })
db.basicProfile.hasMany(db.countries, { foreignKey: "id" })
db.basicProfile.hasMany(db.states, { foreignKey: "id" })
db.basicProfile.hasMany(db.cities, { foreignKey: "id" })


db.sequelize.sync({ force: false })
// .then(() => {
//     console.log("sync done")
// })

module.exports = db