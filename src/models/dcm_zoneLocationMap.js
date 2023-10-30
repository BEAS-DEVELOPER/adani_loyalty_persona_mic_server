module.exports = (sequelize, DataTypes) => {
    const zoneLocMap = sequelize.define('dcm_zone_location_mapping', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_zone_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "dcm_zones",
                key: "id"
            }
        },
        dcm_state_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "cog_states",
                key: "id"
            }
        },
        dcm_district_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "cog_cities",
                key: "id"
            }
        },
        dcm_country_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "cog_countries",
                key: "id"
            }
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_date: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return zoneLocMap;
}
