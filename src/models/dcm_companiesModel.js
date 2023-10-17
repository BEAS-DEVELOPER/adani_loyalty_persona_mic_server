module.exports = (sequelize, DataTypes) => {
    const parentChildMapping = sequelize.define('dcm_companies', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING
        },
        abbreviation: {
            type: DataTypes.STRING
        },
        company_type: {
            type: DataTypes.STRING
        },
        dcm_company_groups_id: {
            type: DataTypes.STRING
        },
        dcm_organization_id: {
            type: DataTypes.STRING
        },
        is_active:{
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    return parentChildMapping;
}