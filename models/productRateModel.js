const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ProductRate = sequelize.define('ProductRate', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        stockType: {
            type: DataTypes.STRING,
        },
        storeId: {
            type: DataTypes.STRING,
        },
        supplierCustomer: {
            type: DataTypes.STRING,
        },
        productId: {
            type: DataTypes.STRING,
        },
        hsnCode: {
            type: DataTypes.STRING,
        },
        batchNo: {
            type: DataTypes.STRING,
        },
        mfgDate: {
            type: DataTypes.STRING,
        },
        expDate: {
            type: DataTypes.STRING,
        },
        freeQty: {
            type: DataTypes.STRING,
        },
        qty: {
            type: DataTypes.STRING,
        },
        purchasePrice: {
            type: DataTypes.STRING,
        },
        discountType: {
            type: DataTypes.STRING,
        },
        discount: {
            type: DataTypes.STRING,
        },
        originalPrice: {
            type: DataTypes.STRING,
        },
        MRP: {
            type: DataTypes.STRING,
        },
        salePrice: {
            type: DataTypes.STRING,
        },
        costPriceWithoutTax: {
            type: DataTypes.STRING,
        },
        taxPercentage: {
            type: DataTypes.STRING,
        },
        taxAmount: {
            type: DataTypes.STRING,
        },
        packingType: {
            type: DataTypes.STRING,
        },
        pack: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
        created_By: {
            type: DataTypes.DATE,
        },
        created_On: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
        },
        edit_By: {
            type: DataTypes.STRING,
        },
        edit_On: {
            type: DataTypes.DATE,
        },
        approveB: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        approved_By: {
            type: DataTypes.STRING,
        },
        displayOrder: {
            type: DataTypes.INTEGER,
        },
        rowGuid: {
            type: DataTypes.STRING,
        }
    });

    return ProductRate;
};
