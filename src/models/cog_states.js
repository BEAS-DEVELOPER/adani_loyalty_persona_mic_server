module.exports = (sequelize, DataTypes) => {
    let cities = sequelize.define('cog_states', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING
        },
        cog_countries_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'cog_countries',
                key: 'id'
            }
        },
        has_cities:{
            type: DataTypes.TINYINT(1)
        },
        iso_code:{
            type: DataTypes.STRING
        },
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        },
        is_active:{
            type: DataTypes.ENUM,
            values:['0','1']
        }
    }, {
        timestamps: false,
    });
    return cities;
}