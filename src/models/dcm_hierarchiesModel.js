module.exports = (sequelize, DataTypes) => {
    let hierarchies = sequelize.define('dcm_hierarchies', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        enabled: {
            type: DataTypes.TINYINT
        },
        root_id: {
            type: DataTypes.STRING
        },
        lft: {
            type: DataTypes.INTEGER
        },
        rgt: {
            type: DataTypes.INTEGER
        },
        level: {
            type: DataTypes.INTEGER
        },
        tree_parent: {
            type: DataTypes.STRING
        },
        dcm_organization_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_organization',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        status:{
            type: DataTypes.ENUM,
            values:['0','1']
        },
        has_dms_login:{
            type: DataTypes.ENUM,
            values:['0','1']
        }
    }, {
        timestamps: false
    });
    return hierarchies;
}
