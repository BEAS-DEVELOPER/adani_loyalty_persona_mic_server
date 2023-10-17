module.exports = (sequelize, DataTypes) => {
    const parentChildMapping = sequelize.define('dcm_contact_parent_child_mapping', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dealer_id: {
            type: DataTypes.INTEGER
        },
        contractor_id: {
            type: DataTypes.INTEGER,
        },
        is_active: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        modified_at: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return parentChildMapping;
}