module.exports = (sequelize, DataTypes) => {
    const paramMaster = sequelize.define('dcm_param_master', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_param_groups_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_param_groups', 
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING
        },
        param_type: {
            type: DataTypes.ENUM,
            values: ["","bool", "text", "int", "float", "date"]
        },
        dcm_organization_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dcm_param_groups', 
                key: 'dcm_organization_id'
            }
        },
        is_multiple:{
            type: DataTypes.ENUM,
            values: ["0", "1"]
        },
        created_at:{
            type: DataTypes.DATE
        },
        modified_at:{
            type: DataTypes.DATE
        }
    }, {
        timestamps: false
    });
    return paramMaster;
}
	
	
	
	
	
	
