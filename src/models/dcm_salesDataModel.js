module.exports = (sequelize, DataTypes) => {
    const salesData = sequelize.define('dcm_sale_data', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_extern01: {
            type: DataTypes.STRING
        },
        dcm_contacts_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_contacts',
                key: 'id'
            }
        },
        dcm_product_master_id: {
            type: DataTypes.INTEGER
        },
        tonnage_sold: {
            type: DataTypes.DECIMAL(20, 4)
        },
        claimed_quantity: {
            type: DataTypes.DECIMAL(20, 4)
        },
        invoice_id: {
            type: DataTypes.STRING
        },
        sale_date: {
            type: DataTypes.DATE
        },
        created_by_contact_id: {
            type: DataTypes.INTEGER
        },
        product_purchased_from: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        is_deleted: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        is_verified: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2', '3']
        },
        is_converted: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        mode: {
            type: DataTypes.ENUM,
            values: ['web', 'sms', 'callcenter', 'mobileapp', 'web bulk upload', 'ws bulk upload', 'automated ivr system']
        },
        verified_by: {
            type: DataTypes.INTEGER
        },
        verified_at: {
            type: DataTypes.DATE
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        beyond_capping: {
            type: DataTypes.TINYINT
        },
        comments: {
            type: DataTypes.STRING
        },
        has_exception: {
            type: DataTypes.TINYINT
        },
        remarks: {
            type: DataTypes.STRING
        },
        dealer_capping: {
            type: DataTypes.TINYINT
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return salesData;
}