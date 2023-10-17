module.exports = (sequelize, DataTypes) => {
    const paramValues = sequelize.define('dcm_param_values', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_param_master_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_param_masters', 
                key: 'id'
            }
        },
        value: {
            type: DataTypes.STRING
        },
        dcm_contacts_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_contacts', 
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE
        },
        modified_at: {
            type: DataTypes.DATE
        },
        group_num: {
            type: DataTypes.INTEGER
        },
        is_verified: {
            type: DataTypes.TINYINT
        },
        verified_by: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return paramValues;
}
