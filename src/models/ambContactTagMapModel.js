module.exports = (sequelize, DataTypes) => {
    let ambContactTagMapModel = sequelize.define('amb_contact_tag_mapping', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contact_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_contacts',
                key: 'id'
            }
        },
        amb_tags_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'amb_tags',
                key: 'id'
            }
        },
        is_active: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return ambContactTagMapModel;
}