module.exports = (sequelize, DataTypes) => {
    const zones = sequelize.define('dcm_zones', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parent_id: {
            type: DataTypes.INTEGER
        },
        zone_name: {
            type: DataTypes.STRING
        },
        dcm_organization_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "dcm_organization",
                key: "id"
            }
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ["0", "1"]
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false
    });
    return zones;
}
