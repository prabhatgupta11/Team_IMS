const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const CodeMaster = sequelize.define('code_master', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code_name: {
            type: DataTypes.STRING,
        },
        code_level: {
            type: DataTypes.STRING,
        },
        ParentPk: {
            type: DataTypes.STRING,
        },
        created_by: {
            type: DataTypes.STRING,
            defaultValue: -1
        },
        created_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
         },
        edit_by : {
            type : DataTypes.STRING,
        },
        edit_on: {
            type: DataTypes.STRING,
        },
        Active: {
            type: DataTypes.STRING,
            defaultValue: 'Active'
        },
        // Active: {
        //     type: DataTypes.ENUM('Active', 'Inactive'), 
        //     defaultValue: 'Active',
        //   },
        approve_b: {
            type: DataTypes.STRING,
            defaultValue: 'Y'
        },
        approved_by: {
            type: DataTypes.STRING,
        },
        displayorder: {
            type: DataTypes.STRING,
        },
        rowguid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
    }, {
        timestamps: false, // Disable createdAt and updatedAt columns
    });

    return CodeMaster;
};
