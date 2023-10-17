module.exports = (sequelize, DataTypes) => {
    let masterContractModel = sequelize.define('ambuja_contractor_category_masters', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        created_at: {
            type: DataTypes.DATE
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        updated_at: {
            type: DataTypes.DATE
        },
        updated_by: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return masterContractModel;
}