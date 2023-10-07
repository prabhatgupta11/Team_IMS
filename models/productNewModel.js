const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const NewProduct = sequelize.define('new_products', {
        itemId: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        category: {
            type: DataTypes.BIGINT(20),
        },
        department : {
            type : DataTypes.STRING(255),
        },
        group : {
            type : DataTypes.STRING(255)
        },
        itemType : {
            type : DataTypes.STRING(150)
        },
        brand : {
            type : DataTypes.STRING(150)
        },
        itemCode : {
            type : DataTypes.STRING(150)
        },
        itemName : {
            type : DataTypes.STRING(150)
        },
        description : {
            type : DataTypes.STRING(150)
        },
        productType : {
            type : DataTypes.STRING(255),
            defaultValue : 'standard'
        },
        status : {
            type : DataTypes.STRING(250)
        },
        sellingPricePolicy : {
            type : DataTypes.STRING(250),
            defaultValue : 'BatchMaster'
        },
        weight : {
            type : DataTypes.STRING(255)
        },
        imageUrl : {
            type : DataTypes.TEXT
        },
        taxType : {
            type : DataTypes.STRING(250),
            defaultValue : 'GST'
        },
        tax : {
            type : DataTypes.STRING(100)
        },
        created_by : {
            type : DataTypes.STRING(255),
        },
        created_on : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW 
        },
        edit_by : {
            type : DataTypes.STRING(255),
        },
        edit_on : {
            type : DataTypes.DATE,
        },
        approve_b : {
            type : DataTypes.STRING,
            defaultValue:'pending'
        },
        approved_by : {
            type : DataTypes.STRING,
        },
        displayOrder : {
            type : DataTypes.INTEGER,
        },
        rowguid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        }
    },
    {
        timestamps: false, // Disable createdAt and updatedAt columns
    })

    return NewProduct
}
