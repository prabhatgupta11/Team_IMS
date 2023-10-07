const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const TaxMaster = sequelize.define('Tax_Master', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Tax_Code: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        HSN_Code: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Tax_percentage: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            defaultValue: 'Active',
        },
        State_Code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        Tax_Type:
        {
            type: DataTypes.STRING(255),
            defaultValue: 'GST',
        },

        created_by: {
            type: DataTypes.STRING(255),
        },
        created_on: {
            type: DataTypes.DATE,
        },
        edit_by: {
            type: DataTypes.STRING(255),
        },
        edit_on: {
            type: DataTypes.DATE,
        },
        approve_b: {
            type: DataTypes.BOOLEAN,
        },
        approved_by: {
            type: DataTypes.STRING(255),
        },
        displayorder: {
            type: DataTypes.INTEGER,
        },
        rowguid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
    });

    return TaxMaster;
};