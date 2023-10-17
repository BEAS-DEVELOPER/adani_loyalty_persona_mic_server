module.exports = (sequelize, DataTypes) => {
    let ambTagGroupModel = sequelize.define('amb_tag_groups', {
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
        created_by: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2']
        }
    }, {
        timestamps: false
    });
    return ambTagGroupModel;
}
