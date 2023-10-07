const { DataTypes } = require("sequelize");
const { sequelize, user } = require(".");

module.exports = (sequelize, DataTypes) => {
const ProductMapping = sequelize.define('product_mapping', {
    productRaiseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productStockId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

return ProductMapping
}