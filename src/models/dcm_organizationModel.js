module.exports = (sequelize, DataTypes) => {
    const organization = sequelize.define('dcm_organization', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        prefix: {
            type: DataTypes.STRING
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return organization;
}
