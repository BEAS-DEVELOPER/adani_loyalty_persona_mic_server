module.exports = (sequelize, DataTypes) => {
    const tempRegProfile = sequelize.define('dcm_emails', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contacts_id:{
            type: DataTypes.INTEGER
        },
        is_default:{
            type: DataTypes.ENUM,
            values:["0","1"]
        },
        email_address:{
            type: DataTypes.STRING
        },
        is_verified:{
            type: DataTypes.INTEGER
        },
        verification_code:{
            type: DataTypes.STRING
        },
        verified_at:{
            type: DataTypes.DATE
        },
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        },
        dcm_organization_id:{
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return tempRegProfile;
}