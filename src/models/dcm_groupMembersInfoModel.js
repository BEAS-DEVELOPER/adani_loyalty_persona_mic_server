        
module.exports = (sequelize, DataTypes) => {
    const organization = sequelize.define('dcm_group_members_info', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE
        },
        created_by: {
            type: DataTypes.STRING
        },
        update_at:{
            type: DataTypes.DATE
        },
        update_by:{
            type: DataTypes.STRING
        },
        is_verified:{
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        verified_by:{
            type : DataTypes.STRING
        },
        dcm_contacts_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_contacts',
                key: 'id'
            }
        },
        dcm_group_members_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_group_members',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return organization;
}
