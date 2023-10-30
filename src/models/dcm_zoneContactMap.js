module.exports = (sequelize, DataTypes) => {
    const zoneContactMap = sequelize.define('dcm_zone_contact_mapping', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_zone_location_mapping_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "dcm_zone_location_mapping",
                key: "id"
            }
        },
        dcm_zone_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "dcm_zones",
                key: "id"
            }
        },
        dcm_contact_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "dcm_contacts",
                key: "id"
            }
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return zoneContactMap;
}
