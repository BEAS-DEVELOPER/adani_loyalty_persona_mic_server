module.exports = (sequelize, DataTypes) => {
    let ambTagModel = sequelize.define('amb_tags', {
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
        code: {
            type: DataTypes.STRING
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        amb_tag_groups_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'amb_tag_groups',
                key: 'id'
            }
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2']
        },
        updated_by: {
            type: DataTypes.INTEGER
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false
    });
    return ambTagModel;
}
