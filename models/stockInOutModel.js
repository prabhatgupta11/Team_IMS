const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    
    const StockInOut = sequelize.define('stock_ledger', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement : true
        },
        itemId : {
            type : DataTypes.STRING(255),
        },
        outletId : {
            type : DataTypes.STRING(255),
        },
        type : {
            type : DataTypes.STRING,
        },
        qty : {
            type : DataTypes.STRING,
        },
        remarks : {
            type : DataTypes.STRING,
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        batchNo: {
            type: DataTypes.STRING,
        },
        expDate: {
            type: DataTypes.DATE,
        },
        productHsnCode: {
            type: DataTypes.STRING,
        },
        created_by: {
            type: DataTypes.STRING,
        }
    },
       {
        timestamps: false, // Disable createdAt and updatedAt columns
       }
    )

    return StockInOut
}

