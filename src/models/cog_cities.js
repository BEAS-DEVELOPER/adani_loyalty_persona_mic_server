module.exports = (sequelize, DataTypes) => {
    let cities = sequelize.define('cog_cities', {
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
        cog_states_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'cog_states',
                key: 'id'
            }
        },
        latitude:{
            type: DataTypes.DECIMAL(8,4)
        },
        longitude:{
            type: DataTypes.DECIMAL(8,4)
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