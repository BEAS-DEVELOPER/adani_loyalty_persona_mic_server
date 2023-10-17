module.exports = (sequelize, DataTypes) => {
    const tempRegProfile = sequelize.define('dcm_phones', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contacts_id:{
            type: DataTypes.INTEGER
        },
        dcm_group_member_id:{
            type: DataTypes.INTEGER
        },
        is_default:{
            type: DataTypes.INTEGER
        },
        number:{
            type: DataTypes.STRING
        },
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        },
        country_code:{
            type: DataTypes.STRING
        },
        std_code:{
            type: DataTypes.STRING
        },
        extension:{
            type: DataTypes.STRING
        },
        is_verified:{
            type: DataTypes.ENUM,
            values:['0','1']
        },
        verified_at:{
            type: DataTypes.DATE
        },
        verified_by:{
            type: DataTypes.INTEGER
        },
        dcm_organization_id:{
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return tempRegProfile;
}