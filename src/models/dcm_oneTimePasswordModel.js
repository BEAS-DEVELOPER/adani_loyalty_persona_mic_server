module.exports = (sequelize, DataTypes) => {
    const dcm_OneTimePass = sequelize.define('dcm_one_time_password', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        otp: {
            type: DataTypes.STRING
        },
        dcm_contact_id: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        valid_up_to: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return dcm_OneTimePass;
}
