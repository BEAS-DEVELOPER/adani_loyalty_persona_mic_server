module.exports = (sequelize, DataTypes) => {
    let mapContractModel = sequelize.define('ambuja_contractor_category_mapping', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        contact_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_contacts',
                key: 'id'
            }
        },
        ambuja_contractor_category_master_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ambuja_contractor_category_master',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return mapContractModel;
}