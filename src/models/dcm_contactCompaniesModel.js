module.exports = (sequelize, DataTypes) => {
    const dcm_contact_companies = sequelize.define('dcm_contact_companies', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contacts_id: {
            type: DataTypes.INTEGER
        },
        dcm_companies_id: {
            type: DataTypes.INTEGER,
        },
        designation: {
            type: DataTypes.STRING
        },
        is_default: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        is_verified :{
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        verified_by:{
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        verified_at: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return dcm_contact_companies;
}