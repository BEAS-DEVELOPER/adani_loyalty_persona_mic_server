module.exports=(sequelize,DataTypes)=>{
    const userFiles=sequelize.define('dcm_user_files',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dcm_contacts_id:{
            type: DataTypes.INTEGER
        },
        file_type:{
            type: DataTypes.STRING
        },
        file_size:{
            type: DataTypes.DECIMAL(10,2)
        },
        file_path:{
            type: DataTypes.STRING
        },
        created_at	:{
            type: DataTypes.DATE
        },
        is_active:{
            type: DataTypes.ENUM,
            values:['0','1']
        },
        group_name:{
            type: DataTypes.STRING
        },
        sub_group_name:{
            type: DataTypes.STRING
        },
        custom1:{
            type: DataTypes.STRING
        },
        custom2:{
            type: DataTypes.STRING
        }
    },{
        timestamps:false
    });
    return userFiles;
}
