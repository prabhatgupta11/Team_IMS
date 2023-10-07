const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ProductPrice = sequelize.define('product_price', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        orderFk: {
            type: DataTypes.STRING,
        },
        outletId: {
            type: DataTypes.STRING,
        },
        itemId: {
            type: DataTypes.STRING,
        },
        stockType: {
            type: DataTypes.STRING,
        },
        supplierCustomer: {
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
        mrp: {
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
        created_by: {
            type: DataTypes.DATE,
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW
        },
        edit_by: {
            type: DataTypes.STRING,
        },
        edit_on: {
            type: DataTypes.DATE,
        },
        approve_b: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        approved_by: {
            type: DataTypes.STRING,
        },
        displayOrder: {
            type: DataTypes.INTEGER,
        },
        rowGuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        }
    },
       {
        timestamps: false, // Disable createdAt and updatedAt columns
       });

    return ProductPrice;
};
