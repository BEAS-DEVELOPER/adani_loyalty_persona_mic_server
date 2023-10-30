module.exports = (sequelize, DataTypes) => {
    const languages = sequelize.define('dcm_languages', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        comment: {
            type: DataTypes.STRING
        },
        language_code: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE
        }
    },
        {
            timestamps: false
        });
    return languages;
}