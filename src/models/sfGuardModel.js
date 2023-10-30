module.exports = (sequelize, DataTypes) => {
    const sf_guard_user = sequelize.define('sf_guard_user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username:{
            type: DataTypes.INTEGER
        },
        algorithm:{
            type : DataTypes.STRING
        },
        salt:{
            type :DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        updated_at:{
            type: DataTypes.DATE
        },
        created_at:{
            type: DataTypes.DATE
        },
        last_login:{
            type: DataTypes.DATE
        },
        is_active:{
            type: DataTypes.INTEGER
        },
        is_super_admin:{
            type: DataTypes.INTEGER
        },
        dcm_hierarchies_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_hierarchies',
                key: 'id'
            }
        },
        dcm_contacts_id:{
            type: DataTypes.STRING,
            references: {
                model: 'dcm_contacts',
                key: 'id'
            }
        },
        dcm_organization_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_organization',
                key: 'id'
            }
        },
        force_pass_chaged:{
            type: DataTypes.TINYINT
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return sf_guard_user;
}