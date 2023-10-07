const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const StoreCategoryMapping = sequelize.define('store_category_mapping', {

        id : {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        storeFk : {
            type : DataTypes.BIGINT(20),
        },
        categoryFk : {
            type : DataTypes.BIGINT(20),
        },
        create_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW 
        },
        created_by : {
            type : DataTypes.STRING,
        }
    })

    return StoreCategoryMapping
}