module.exports = (sequelize, DataTypes) => {
    let countries = sequelize.define('cog_countries', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING
        },
        has_states:{
            type: DataTypes.TINYINT(1)
        },
        has_cities:{
            type: DataTypes.TINYINT(1)
        },
        currency_name:{
            type: DataTypes.STRING
        },
        currency_code:{
            type: DataTypes.STRING
        },
        dialing_code:{
            type: DataTypes.INTEGER
        },
        iso2_code:{
            type: DataTypes.STRING
        },
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        }
    },{
        timestamps:false
    })
    return countries;
}