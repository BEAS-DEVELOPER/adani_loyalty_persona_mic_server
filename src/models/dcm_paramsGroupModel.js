module.exports = (sequelize, DataTypes) => {
    const paramGroups = sequelize.define('dcm_param_groups', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        dcm_organization_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_organizations', 
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE
        },
        modified_at: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false
    });
    return paramGroups;
}
