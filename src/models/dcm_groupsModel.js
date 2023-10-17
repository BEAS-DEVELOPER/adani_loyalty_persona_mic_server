module.exports = (sequelize, DataTypes) => {
    const organization = sequelize.define('dcm_groups', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false
    });
    return organization;
}
