module.exports = (sequelize, DataTypes) => {
    const basicProfile = sequelize.define('dcm_addresses', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contacts_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_contacts', 
                key: 'id'
             }
        },
        recipient: {
            type: DataTypes.STRING
        },
        dcm_group_members_id: {
            type: DataTypes.INTEGER
        },
        is_default: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        line1: {
            type: DataTypes.STRING
        },
        line2: {
            type: DataTypes.STRING
        },
        line3: {
            type: DataTypes.STRING
        },
        dcm_countries_id: {
            type: DataTypes.INTEGER
        },
        dcm_states_id: {
            type: DataTypes.INTEGER
        },
        dcm_cities_id: {
            type: DataTypes.INTEGER
        },
        city: {
            type: DataTypes.STRING
        },
        post_code: {
            type: DataTypes.STRING
        },
        address_change_type: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2']
        },
        address_status: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2', '3']
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        is_active: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        is_verified: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        verified_at: {
            type: DataTypes.DATE
        },
        verified_by: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        dcm_organization_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_organization', 
                key: 'id'
             }
        },
        dcm_companies_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_companies', 
                key: 'id'
             }
        },
        edit_lock: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        dcm_taluka_id: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false
    });
    return basicProfile;
}