module.exports = (sequelize, DataTypes) => {
    const ambujaPanDeclarationLogs = sequelize.define('ambuja_pan_declaration_log', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contact_id: {
            type: DataTypes.INTEGER
        },
        dcm_order_id: {
            type: DataTypes.INTEGER
        },
        declaration_type: {
            type: DataTypes.ENUM,
            values: ['O', 'E']
        },
        declare_no_pan: {
            type: DataTypes.ENUM,
            values: ['0', '1']
        },
        created_at: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return ambujaPanDeclarationLogs;
}