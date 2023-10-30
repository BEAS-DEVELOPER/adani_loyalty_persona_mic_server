module.exports = (sequelize, DataTypes) => {
    const tempRegProfile = sequelize.define('dcm_contacts', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        parent_contact_id: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        middle_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        profile_pic: {
            type: DataTypes.STRING
        },
        loyalty_code: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING
        },
        company: {
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        date_of_birth: {
            type: DataTypes.DATE
        },
        telecall_required: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2']
        },
        reference_code: {
            type: DataTypes.STRING
        },
        is_deleted: {
            type: DataTypes.INTEGER
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        sf_guard_user_id: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: 'sf_guard_user', 
            //     key: 'id'
            // }
        },
        dcm_hierarchies_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_hierarchies', 
                key: 'id'
            }
        },
        is_verified: {
            type: DataTypes.STRING
        },
        verified_at: {
            type: DataTypes.DATE
        },
        verified_by: {
            type: DataTypes.INTEGER
        },
        dcm_organization_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_organization', 
                key: 'id'
            }
        },
        id_extern02: {
            type: DataTypes.STRING
        },
        enrollment_date: {
            type: DataTypes.DATE
        },
        parent_contact_id_02: {
            type: DataTypes.INTEGER
        },
        parent_contact_id_03: {
            type: DataTypes.INTEGER
        },
        contact_hash: {
            type: DataTypes.STRING
        },
        dcm_languages_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_languages', 
                key: 'id'
            }
        },
        can_redeem: {
            type: DataTypes.ENUM,
            values: ['0', '1' ,'2']
        },
        is_approved: {
            type: DataTypes.ENUM,
            values: ['0', '1' ,'2']
        },
        approved_by: {
            type: DataTypes.INTEGER
        },
        approved_at: {
            type: DataTypes.DATE
        },

        //__________________________
        id_extern01:{
            type: DataTypes.STRING,
            references: {
                model: 'dcm_sale_data', 
                key: 'id_extern01'
            }
        },
        designation:{
            type: DataTypes.STRING
        },
        is_verified:{
            type: DataTypes.STRING
        },
        verified_by:{
            type: DataTypes.STRING
        },
        is_deleted:{
            type: DataTypes.STRING
        },
        enrollment_date:{
            type: DataTypes.STRING
        },
        can_redeem:{
            type: DataTypes.STRING
        }

    }, {
        timestamps: false
    });
    return tempRegProfile;
}