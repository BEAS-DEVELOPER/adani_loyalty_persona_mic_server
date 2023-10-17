module.exports = (sequelize, DataTypes) => {
    const organization = sequelize.define('dcm_group_members', {
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
        master_groups_id: {
            type: DataTypes.STRING
        },
        master_groups_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_groups',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    });
    return organization;
}
